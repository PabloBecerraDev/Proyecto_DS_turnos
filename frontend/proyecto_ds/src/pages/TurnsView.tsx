import React from 'react';

const styles: { [key: string]: React.CSSProperties } = {
  background:  {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '40px',
    width: '100%',
    height: '100%',
    backgroundColor: '#e8dbb5',
    padding: '2rem',
    boxSizing: 'content-box',
    overflowX: 'hidden',
  },
  card: {
    backgroundColor: 'white',
    border: '2px solid black',
    padding: '2rem',
    borderRadius: '4px',
    textAlign: 'center',
    width: '250px',
    boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.2)',
  },
  turnNumber: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  turnLabel: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
};
  
const Turns = () => {
  return (
    <div style={styles.background}>
      <div style={styles.card}>
        <div style={styles.turnNumber}>A100</div>
        <div style={styles.turnLabel}>TURNO ANTERIOR</div>
      </div>
      <div style={{ ...styles.card, transform: 'scale(1.1)' }}>
        <div style={styles.turnNumber}>A101</div>
        <div style={styles.turnLabel}>TURNO ACTUAL</div>
      </div>
      <div style={styles.card}>
        <div style={styles.turnNumber}>A102</div>
        <div style={styles.turnLabel}>TURNO SIGUIENTE</div>
      </div>
    </div>
  );
};

export default Turns;