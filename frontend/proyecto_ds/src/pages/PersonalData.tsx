import React, { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios'
import { Link } from "react-router-dom"
//Funcion de authcontext para obtener el payload del token desencriptado
import { getPayload } from "../context/AuthContext.tsx"
import { userService } from "../services/api.tsx"

const styles: { [key: string]: React.CSSProperties } = {
  background: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '80vh',
    backgroundColor: '#f3f3f3',
    padding: '2rem',
    boxSizing: 'border-box',
  },
  formWrapper: {
    width: '80%',
    maxWidth: '900px',
    backgroundColor: '#f3f3f3',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formLayout: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    width: '100%',
  },
  fieldContainer: {
    flex: '1 1 40%',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '200px',
  },
  fieldLabel: {
    fontWeight: 'bold',
    fontSize: '0.95rem',
    color: '#555',
    marginBottom: '0.5rem',
  },
  fieldValue: {
    backgroundColor: '#ffffff',
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    fontSize: '1rem',
    color: '#333',
  },
  button: {
    marginTop: '2rem',
    padding: '0.75rem 2rem',
    backgroundColor: '#d3d3d3',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    cursor: 'pointer',
    alignSelf: 'center',
  },
};

const PersonalData = () => {
  const [user, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  //Id del usuario
  const id = 1
  console.log(localStorage.getItem("accessToken"))
  console.log(getPayload.id())
  const fetchUsers = async (id: number) => {
    try {
      const response: AxiosResponse<any, any> = await userService.getById(id)
      setUsers(response.data)
      setError("")
      console.log(userService.getById(id))
    } catch (err) {
      setError("Error al cargar los usuarios")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers(id)
  }, [])

  const [nombre] = useState('Juan Pérez');
  const [cedula] = useState('12345678');
  const [codigo] = useState('A123');
  const [prioridad] = useState('Discapacitado');
  const [contrasena] = useState('••••••••');

  return (
    <div style={styles.background}>
      <div style={styles.formWrapper}>
        <div style={styles.formLayout}>
          <div style={styles.fieldContainer}>
            <label style={styles.fieldLabel}>Nombre:</label>
            <div style={styles.fieldValue}>{nombre}</div>
          </div>

          <div style={styles.fieldContainer}>
            <label style={styles.fieldLabel}>Cédula:</label>
            <div style={styles.fieldValue}>{cedula}</div>
          </div>

          <div style={styles.fieldContainer}>
            <label style={styles.fieldLabel}>Código:</label>
            <div style={styles.fieldValue}>{codigo}</div>
          </div>

          <div style={styles.fieldContainer}>
            <label style={styles.fieldLabel}>Prioridad:</label>
            <div style={styles.fieldValue}>{prioridad}</div>
          </div>

          <div style={styles.fieldContainer}>
            <label style={styles.fieldLabel}>Contraseña:</label>
            <div style={styles.fieldValue}>{contrasena}</div>
          </div>
        </div>

        <button style={styles.button}>Editar</button>
      </div>
    </div>
  );
};

export default PersonalData;
