import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './style.css'; // Importar archivo CSS global

const UserProfile = () => {
  // Simulación de tus datos
  const [user, setUser] = useState({
    nombre: "Juan Pérez",
    cedula: "123456789",
    codigo: "AB123",
    prioridad: "Alta",
  });

  const [editing, setEditing] = useState(false); // Estado para controlar si estamos editando
  const [formData, setFormData] = useState(user);

  useEffect(() => {
    // Inicializar el formulario con tus datos actuales
    setFormData(user);
  }, [user]);

  const handleEditClick = () => {
    setEditing(true); // Activar modo de edición
  };

  const handleCancelClick = () => {
    setEditing(false); // Cancelar edición
    setFormData(user); // Restaurar los datos originales
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Actualizar el valor del campo correspondiente
    });
  };

  const handleSaveClick = () => {
    // Guardar los cambios realizados en los datos
    setUser(formData);
    setEditing(false); // Desactivar el modo de edición
  };

  return (
    <div className="background">
      <div className="formWrapper">
        <h2>Mis Datos</h2>
        
        {editing ? (
          <div className="formContainer">
            <div className="fieldContainer">
              <label className="fieldLabel">Nombre:</label>
              <input
                className="fieldInput"
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div className="fieldContainer">
              <label className="fieldLabel">Cédula:</label>
              <input
                className="fieldInput"
                type="text"
                name="cedula"
                value={formData.cedula}
                onChange={handleInputChange}
              />
            </div>
            <div className="fieldContainer">
              <label className="fieldLabel">Código:</label>
              <input
                className="fieldInput"
                type="text"
                name="codigo"
                value={formData.codigo}
                onChange={handleInputChange}
              />
            </div>
            <div className="fieldContainer">
              <label className="fieldLabel">Prioridad:</label>
              <input
                className="fieldInput"
                type="text"
                name="prioridad"
                value={formData.prioridad}
                onChange={handleInputChange}
              />
            </div>
            <button className="saveButton" onClick={handleSaveClick}>Guardar</button>
            <button className="cancelButton" onClick={handleCancelClick}>Cancelar</button>
          </div>
        ) : (
          <div className="detailsContainer">
            <div className="fieldContainer">
              <label className="fieldLabel">Nombre:</label>
              <div className="fieldValue">{user.nombre}</div>
            </div>
            <div className="fieldContainer">
              <label className="fieldLabel">Cédula:</label>
              <div className="fieldValue">{user.cedula}</div>
            </div>
            <div className="fieldContainer">
              <label className="fieldLabel">Código:</label>
              <div className="fieldValue">{user.codigo}</div>
            </div>
            <div className="fieldContainer">
              <label className="fieldLabel">Prioridad:</label>
              <div className="fieldValue">{user.prioridad}</div>
            </div>
            <button className="editButton" onClick={handleEditClick}>Editar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;




// import React, { useState, useEffect } from 'react';
// import { AxiosResponse } from 'axios'
// import { Link } from "react-router-dom"
// //Funcion de authcontext para obtener el payload del token desencriptado
// import { getPayload } from "../../context/AuthContext.tsx"
// import { userService } from "../../services/api.tsx"

// const styles: { [key: string]: React.CSSProperties } = {
//   background: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     height: '80vh',
//     backgroundColor: '#f3f3f3',
//     padding: '2rem',
//     boxSizing: 'border-box',
//   },
//   formWrapper: {
//     width: '80%',
//     maxWidth: '900px',
//     backgroundColor: '#f3f3f3',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   formLayout: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     gap: '20px',
//     width: '100%',
//   },
//   fieldContainer: {
//     flex: '1 1 40%',
//     display: 'flex',
//     flexDirection: 'column',
//     minWidth: '200px',
//   },
//   fieldLabel: {
//     fontWeight: 'bold',
//     fontSize: '0.95rem',
//     color: '#555',
//     marginBottom: '0.5rem',
//   },
//   fieldValue: {
//     backgroundColor: '#ffffff',
//     padding: '1rem',
//     borderRadius: '8px',
//     border: '1px solid #ddd',
//     boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
//     fontSize: '1rem',
//     color: '#333',
//   },
//   button: {
//     marginTop: '2rem',
//     padding: '0.75rem 2rem',
//     backgroundColor: '#d3d3d3',
//     border: 'none',
//     borderRadius: '12px',
//     fontSize: '1rem',
//     cursor: 'pointer',
//     alignSelf: 'center',
//   },
// };

// const PersonalData = () => {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState("")
//   const [successMessage, setSuccessMessage] = useState("")

//   //Id del usuario
//   const id = getPayload.id().user_id
  
//   const fetchUsers = async (id: number) => {
//     try {
//       const response: AxiosResponse<any, any> = await userService.getById(id)
//       setUser(response.data)
//       setError("")
//       console.log(userService.getById(id))
//     } catch (err) {
//       setError("Error al cargar los usuarios")
//       console.error(err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchUsers(id)
//   }, [])

//   return (
//     <div style={styles.background}>
//       <div style={styles.formWrapper}>
//         <div style={styles.formLayout}>
//         <div style={styles.fieldContainer}>
//           <label style={styles.fieldLabel}>Nombre:</label>
//           <div style={styles.fieldValue}>{user?.nombre ?? 'Cargando...'}</div>
//         </div>

//         <div style={styles.fieldContainer}>
//           <label style={styles.fieldLabel}>Cédula:</label>
//           <div style={styles.fieldValue}>{user?.cedula ?? 'Cargando...'}</div>
//         </div>

//         <div style={styles.fieldContainer}>
//           <label style={styles.fieldLabel}>Código:</label>
//           <div style={styles.fieldValue}>{user?.codigo ?? 'Cargando...'}</div>
//         </div>

//         <div style={styles.fieldContainer}>
//           <label style={styles.fieldLabel}>Prioridad:</label>
//           <div style={styles.fieldValue}>{user?.prioridad ?? 'Sin prioridad'}</div>
//         </div>

//         <div style={styles.fieldContainer}>
//           <label style={styles.fieldLabel}>Contraseña:</label>
//           <div style={styles.fieldValue}>••••••••</div> {/* nunca muestres la real */}
//         </div>
//         </div>
//         <button style={styles.button}>Editar</button>
//       </div>
//     </div>
//   );
// };

// export default PersonalData;
