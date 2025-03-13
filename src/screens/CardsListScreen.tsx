import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllCards, deleteCard } from '../utils/cardStorage';
import Logo from '../components/Logo';
import BusinessCard from '../components/BusinessCard';
import './CardsListScreen.css';

const CardsListScreen: React.FC = () => {
    const navigate = useNavigate();
    const [cards, setCards] = useState<any[]>([]);

    useEffect(() => {
        setCards(getAllCards());
    }, []);

    const containerStyle = {
        minHeight: '100vh',
        padding: '40px 20px',
        background: 'linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%)',
        fontFamily: 'Poppins, sans-serif',
        color: '#FFFFFF',
    };

    const headerContainerStyle = {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        position: 'relative' as const,
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto 40px',
    };

    const backButtonStyle = {
        padding: '12px 20px',
        border: 'none',
        borderRadius: '50px',
        background: 'rgba(255, 255, 255, 0.2)',
        color: '#FFFFFF',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
    };

    const cardsGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto',
    };

    const cardContainerStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '20px',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        gap: '20px',
    };

    const buttonStyle = {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '50px',
        background: 'rgba(255, 255, 255, 0.9)',
        color: '#1a2a6c',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'all 0.3s ease',
    };

    const titleStyle = {
        fontSize: '2em',
        textAlign: 'center' as const,
        width: '100%',
        color: '#FFFFFF',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
        margin: '20px 0',
    };

    const handleDelete = (id: string) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta tarjeta?')) {
            deleteCard(id);
            setCards(getAllCards());
        }
    };

    const handleEdit = (id: string) => {
        navigate(`/admin/${id}`);
    };

    const handleView = (id: string) => {
        navigate(`/preview/${id}`);
    };

    return (
        <div style={containerStyle}>
            <div style={headerContainerStyle} className="header-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Logo size={80} color="#FFFFFF" />
                </motion.div>
                <h1 style={titleStyle} className="title">My Business Cards</h1>
                <div className="back-button-container">
                    <motion.button
                        style={backButtonStyle}
                        className="back-button"
                        whileHover={{
                            scale: 1.05,
                            background: 'rgba(255, 255, 255, 0.3)'
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/')}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <i className="fas fa-arrow-left" /> Back
                    </motion.button>
                </div>
            </div>

            <div style={cardsGridStyle}>
                {cards.map((card) => (
                    <motion.div
                        key={card.id}
                        style={cardContainerStyle}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <BusinessCard cardData={card} />
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <motion.button
                                style={buttonStyle}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleView(card.id)}
                            >
                                <i className="fas fa-eye" /> View
                            </motion.button>
                            <motion.button
                                style={buttonStyle}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleEdit(card.id)}
                            >
                                <i className="fas fa-edit" /> Edit
                            </motion.button>
                            <motion.button
                                style={{ ...buttonStyle, background: 'rgba(255, 99, 99, 0.9)' }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDelete(card.id)}
                            >
                                <i className="fas fa-trash" /> Delete
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CardsListScreen; 