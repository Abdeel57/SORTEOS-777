import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, CreditCard } from 'lucide-react';
import { getSettings } from '../services/api';
import { PaymentAccount } from '../types';
import PageAnimator from '../components/PageAnimator';
import Spinner from '../components/Spinner';
import { useOptimizedAnimations } from '../utils/deviceDetection';
import { useToast } from '../hooks/useToast';
import { getBankStyle } from '../utils/bankStyles';

const PaymentAccountsPage = () => {
    const [accounts, setAccounts] = useState<PaymentAccount[]>([]);
    const [loading, setLoading] = useState(true);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const reduceAnimations = useOptimizedAnimations();
    const toast = useToast();

    useEffect(() => {
        getSettings().then(settings => {
            setAccounts(settings.paymentAccounts || []);
            setLoading(false);
        });
    }, []);

    const copyToClipboard = async (text: string, accountId: string, fieldName: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedId(`${accountId}-${fieldName}`);
            toast.success('¡Copiado!', `${fieldName} copiado al portapapeles`);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            toast.error('Error', 'No se pudo copiar');
        }
    };

    // Formatear número de tarjeta/cuenta con espacios cada 4 dígitos
    const formatCardNumber = (number: string) => {
        if (!number) return '';
        const cleaned = number.replace(/\s/g, '');
        return cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    };

    return (
        <PageAnimator>
            <div className="min-h-screen bg-background-primary relative overflow-hidden">
                {/* Fondo con efecto */}
                <div className="absolute inset-0 bg-gradient-to-b from-background-primary via-purple-900/10 to-background-primary" />
                {!reduceAnimations && (
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-20 left-10 w-72 h-72 bg-action/20 rounded-full blur-3xl" />
                        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
                    </div>
                )}

                <div className="container mx-auto px-4 max-w-6xl py-12 md:py-16 relative z-10">
                    {/* Header */}
                    <motion.div
                        initial={reduceAnimations ? {} : { opacity: 0, y: -20 }}
                        animate={reduceAnimations ? {} : { opacity: 1, y: 0 }}
                        transition={reduceAnimations ? {} : { duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
                            <span className="bg-gradient-to-r from-action via-accent to-action bg-clip-text text-transparent">
                                Métodos de Pago
                            </span>
                        </h1>
                        <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
                            Realiza tu pago usando cualquiera de nuestros métodos disponibles. Una vez realizado, envía tu comprobante a nuestro WhatsApp.
                        </p>
                    </motion.div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <Spinner />
                        </div>
                    ) : accounts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-slate-400 text-lg">No hay métodos de pago configurados</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {accounts.map((acc, index) => {
                                const bankStyle = getBankStyle(acc.bank);
                                const cardNumber = acc.card || acc.accountNumber;
                                const displayNumber = formatCardNumber(cardNumber);
                                
                                return (
                                    <motion.div
                                        key={acc.id}
                                        initial={reduceAnimations ? {} : { opacity: 0, y: 30 }}
                                        animate={reduceAnimations ? {} : { opacity: 1, y: 0 }}
                                        transition={reduceAnimations ? {} : { delay: index * 0.1, duration: 0.5 }}
                                        whileHover={reduceAnimations ? {} : { y: -8, scale: 1.03 }}
                                        className="relative group perspective-1000"
                                    >
                                        {/* Efecto de resplandor en hover */}
                                        {!reduceAnimations && (
                                            <div 
                                                className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10"
                                                style={{ background: bankStyle.gradient }}
                                            />
                                        )}
                                        
                                        {/* Tarjeta de débito estilizada */}
                                        <div 
                                            className="relative rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 aspect-[1.586/1]"
                                            style={{
                                                background: bankStyle.gradient,
                                                minHeight: '240px',
                                            }}
                                        >
                                            {/* Patrón de líneas onduladas decorativas */}
                                            <div className="absolute inset-0 opacity-20">
                                                <svg className="w-full h-full" viewBox="0 0 400 250" preserveAspectRatio="none">
                                                    <path 
                                                        d="M0,200 Q100,150 200,180 T400,160 L400,250 L0,250 Z" 
                                                        fill="none" 
                                                        stroke="white" 
                                                        strokeWidth="2"
                                                        opacity="0.3"
                                                    />
                                                    <path 
                                                        d="M0,220 Q150,170 300,200 T400,180 L400,250 L0,250 Z" 
                                                        fill="none" 
                                                        stroke="white" 
                                                        strokeWidth="1.5"
                                                        opacity="0.2"
                                                    />
                                                </svg>
                                            </div>

                                            {/* Contenido de la tarjeta */}
                                            <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                                                {/* Parte superior - Chip y símbolos */}
                                                <div className="flex items-start justify-between mb-4">
                                                    {/* Chip EMV */}
                                                    <div className="relative">
                                                        <div 
                                                            className="w-12 h-10 rounded-md flex items-center justify-center"
                                                            style={{ 
                                                                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                                                                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)'
                                                            }}
                                                        >
                                                            <div className="grid grid-cols-3 gap-0.5 w-8 h-6">
                                                                {[...Array(9)].map((_, i) => (
                                                                    <div 
                                                                        key={i}
                                                                        className="bg-black/30 rounded-sm"
                                                                        style={{
                                                                            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)'
                                                                        }}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Símbolo de pago sin contacto */}
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex flex-col gap-0.5">
                                                            <div className="w-8 h-1 bg-white/80 rounded-full"></div>
                                                            <div className="w-6 h-1 bg-white/80 rounded-full ml-1"></div>
                                                            <div className="w-4 h-1 bg-white/80 rounded-full ml-2"></div>
                                                            <div className="w-2 h-1 bg-white/80 rounded-full ml-3"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Parte central - Información principal */}
                                                <div className="flex-1 flex flex-col justify-center space-y-3">
                                                    {/* Nombre del banco */}
                                                    <div className="mb-2">
                                                        <h3 
                                                            className="text-lg md:text-xl font-bold tracking-wide"
                                                            style={{ color: bankStyle.textColor }}
                                                        >
                                                            {bankStyle.name}
                                                        </h3>
                                                        {acc.paymentMethod && (
                                                            <p 
                                                                className="text-xs opacity-80 mt-0.5"
                                                                style={{ color: bankStyle.textColor }}
                                                            >
                                                                {acc.paymentMethod}
                                                            </p>
                                                        )}
                                                    </div>

                                                    {/* Número de tarjeta/cuenta */}
                                                    <div className="relative">
                                                        <div className="flex items-center justify-between">
                                                            <p 
                                                                className="text-lg md:text-xl font-mono tracking-widest select-all"
                                                                style={{ 
                                                                    color: bankStyle.textColor,
                                                                    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                                                    letterSpacing: '0.1em'
                                                                }}
                                                            >
                                                                {displayNumber}
                                                            </p>
                                                            <button
                                                                onClick={() => copyToClipboard(cardNumber, acc.id, 'Número')}
                                                                className="ml-2 p-1.5 rounded-lg transition-all hover:scale-110"
                                                                style={{
                                                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                                    backdropFilter: 'blur(10px)',
                                                                }}
                                                                title="Copiar número"
                                                            >
                                                                {copiedId === `${acc.id}-Número` ? (
                                                                    <Check className="w-4 h-4" style={{ color: bankStyle.textColor }} />
                                                                ) : (
                                                                    <Copy className="w-4 h-4" style={{ color: bankStyle.textColor }} />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Parte inferior - Información adicional */}
                                                <div className="mt-4 space-y-2">
                                                    {/* Titular */}
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex-1 min-w-0">
                                                            <p 
                                                                className="text-xs opacity-70 mb-0.5 uppercase tracking-wider"
                                                                style={{ color: bankStyle.textColor }}
                                                            >
                                                                Titular
                                                            </p>
                                                            <p 
                                                                className="text-sm md:text-base font-semibold truncate"
                                                                style={{ color: bankStyle.textColor }}
                                                            >
                                                                {acc.accountHolder}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* CLABE y Concepto en una línea */}
                                                    <div className="flex items-center justify-between gap-4 text-xs">
                                                        {acc.interbankKey && (
                                                            <div className="flex-1 min-w-0">
                                                                <p 
                                                                    className="opacity-70 mb-0.5 uppercase tracking-wider"
                                                                    style={{ color: bankStyle.textColor }}
                                                                >
                                                                    CLABE
                                                                </p>
                                                                <div className="flex items-center gap-1">
                                                                    <p 
                                                                        className="font-mono truncate"
                                                                        style={{ color: bankStyle.textColor }}
                                                                    >
                                                                        {acc.interbankKey}
                                                                    </p>
                                                                    <button
                                                                        onClick={() => copyToClipboard(acc.interbankKey || '', acc.id, 'CLABE')}
                                                                        className="p-1 rounded transition-all hover:scale-110"
                                                                        style={{
                                                                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                                        }}
                                                                        title="Copiar CLABE"
                                                                    >
                                                                        {copiedId === `${acc.id}-CLABE` ? (
                                                                            <Check className="w-3 h-3" style={{ color: bankStyle.textColor }} />
                                                                        ) : (
                                                                            <Copy className="w-3 h-3" style={{ color: bankStyle.textColor }} />
                                                                        )}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                        
                                                        {acc.paymentConcept && (
                                                            <div className="flex-1 min-w-0 text-right">
                                                                <p 
                                                                    className="opacity-70 mb-0.5 uppercase tracking-wider"
                                                                    style={{ color: bankStyle.textColor }}
                                                                >
                                                                    Concepto
                                                                </p>
                                                                <p 
                                                                    className="font-semibold truncate"
                                                                    style={{ color: bankStyle.textColor }}
                                                                >
                                                                    {acc.paymentConcept}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Sombra de la tarjeta */}
                                            <div 
                                                className="absolute inset-0 rounded-2xl pointer-events-none"
                                                style={{
                                                    boxShadow: '0 10px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                                                }}
                                            />
                                        </div>

                                        {/* Nota debajo de la tarjeta */}
                                        <div className="mt-3 text-center">
                                            <p className="text-xs text-slate-400">
                                                Envía tu comprobante por WhatsApp
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </PageAnimator>
    );
};

export default PaymentAccountsPage;
