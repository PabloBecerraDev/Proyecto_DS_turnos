from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Actor, Worker
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta():
        model = User
        fields = '__all__'
        extra_kwargs = {
            'password':{'write_only':True}
        }
    
    def create(self, validated_data):
        user = User.objects.create_user(
            cedula=validated_data['cedula'],
            password=validated_data['password'],
            nombre=validated_data['nombre'],
            email=validated_data['email'],
            phone_number=validated_data['phone_number']
        )
        return user
    
    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance

class ActorSerializer(serializers.ModelSerializer):
    class Meta():
        model = Actor
        fields = ['id', 'nombre', 'cedula', 'email', 'phone_number', 'password', 'has_priority', 'motive']
        extra_kwargs = {
            'password':{'write_only':True},
            'motive': {'required': False, 'allow_null': True}
        }

    def validate(self, attrs):
        print("Entrando en validación del serializador")
        print(f"Datos recibidos: {attrs}")
        return attrs

    def create(self, validated_data):
        has_priority = validated_data.pop('has_priority', False)
        #motive = validated_data.pop('motive')
        motive = validated_data.pop('motive', None)  
        print(motive)
        if not has_priority:
            motive = None 
        else:
            motive = validated_data.pop('motive', None)
        
        user = User.objects.create_user(
            cedula=validated_data['cedula'],
            password=validated_data['password'],
            nombre=validated_data['nombre'],
            email=validated_data['email'],
            phone_number=validated_data['phone_number']
        )

        actor = Actor.objects.create(
            cedula=user.cedula,
            password=user.password,
            nombre=user.nombre,
            email=user.email,
            phone_number=user.phone_number,
            has_priority=has_priority,
            motive=motive,
            id=user.id
        )
        return actor
    
    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance

class WorkerSerializer(UserSerializer):
    class Meta():
        model = Worker
        fields = ['id', 'nombre', 'cedula', 'email', 'phone_number', 'password', 'code']
        extra_kwargs = {
            'password':{'write_only':True},
            'code': {'required': False, 'allow_null': True}
        }

    def create(self, validated_data):
        # code = validated_data.pop('code')
        
        user = User.objects.create_user(
            cedula=validated_data['cedula'],
            password=validated_data['password'],
            nombre=validated_data['nombre'],
            email=validated_data['email'],
            phone_number=validated_data['phone_number']
        )

        worker = Worker.objects.create(
            cedula=user.cedula,
            password=user.password,
            nombre=user.nombre,
            email=user.email,
            phone_number=user.phone_number,
            # code=code,
            id=user.id
        )
        return worker
    
    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['id'] = user.id
        token['cedula'] = user.cedula
        token['nombre'] = user.nombre

        # la idea con esto es la siguiente una vez que alguien se loguee 
        # en el token tambien ira la informacion de que rol cumple el user 
        # logueado esto para protejer las rutas en el frontend
        if hasattr(user, 'actor'):
            token['role'] = 'actor'
        elif hasattr(user, 'worker'):
            token['role'] = 'worker'
        else:
            token['role'] = 'user'
        

        return token
    
    def validate(self, attrs):
        cedula = attrs.get("cedula")
        password = attrs.get("password")

        try:
            user = User.objects.get(cedula=cedula)
        except User.DoesNotExist:
            raise serializers.ValidationError("Cedula o contraseña incorrecta")
        
        if not user.check_password(password):
            raise serializers.ValidationError("Cedula o contraseña incorrecta")
        
        data = super().validate({
            "cedula" : user.cedula,
            "password" : password 
        })

        return data