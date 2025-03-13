import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';

const HomeScreen: React.FC = () => {
    const navigate = useNavigate();

    const containerStyle = {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%)',
        fontFamily: 'Poppins, sans-serif',
        color: '#FFFFFF',
        padding: '20px',
    };

    const contentStyle = {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        maxWidth: '600px',
        width: '100%',
        padding: '40px',
        borderRadius: '20px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    };

    const titleStyle = {
        fontSize: '2.5em',
        marginTop: '20px',
        marginBottom: '30px',
        textAlign: 'center' as const,
        fontWeight: '600',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
    };

    const buttonContainerStyle = {
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap' as const,
        justifyContent: 'center',
    };

    const buttonStyle = {
        padding: '15px 30px',
        margin: '10px',
        border: 'none',
        borderRadius: '50px',
        background: 'rgba(255, 255, 255, 0.9)',
        color: '#1a2a6c',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '500',
        fontFamily: 'Poppins, sans-serif',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        minWidth: '200px',
    };

    return (
        <div style={containerStyle}>
            <motion.div
                style={contentStyle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <Logo size={120} color="#FFFFFF" />
                <h1 style={titleStyle}>
                    Business Card Generator
                </h1>
                <div style={buttonContainerStyle}>
                    <motion.button
                        style={buttonStyle}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)'
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/admin')}
                    >
                        Create New Card
                    </motion.button>
                    <motion.button
                        style={buttonStyle}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)'
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/cards')}
                    >
                        View All Cards
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default HomeScreen; 