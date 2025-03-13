import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
    size?: number;
    color?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 80, color = '#2C3E50' }) => {
    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
        >
            <svg
                width={size}
                height={size}
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <motion.rect
                    x="20"
                    y="20"
                    width="60"
                    height="60"
                    rx="10"
                    fill={color}
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                />
                <motion.rect
                    x="35"
                    y="35"
                    width="30"
                    height="30"
                    rx="5"
                    fill="white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                />
                <defs>
                    <filter id="shadow">
                        <feDropShadow dx="0.2" dy="0.2" stdDeviation="0.2" floodColor="#DDDDDD" />
                    </filter>
                </defs>
                <motion.text
                    x="50"
                    y="52"
                    fill="#DDDDDD"
                    fontSize="30"
                    fontFamily="Poppins"
                    fontWeight="600"
                    filter="url(#shadow)"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                >
                    BC
                </motion.text>
            </svg>
        </motion.div>
    );
};

export default Logo; 