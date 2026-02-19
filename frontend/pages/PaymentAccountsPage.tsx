import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, CreditCard, User, Copy, Check, Sparkles, Wallet, Hash, FileText } from 'lucide-react';
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
                    {/* Header mejorado */}
                    <motion.div
                        initial={reduceAnimations ? {} : { opacity: 0, y: -20 }}
                        animate={reduceAnimations ? {} : { opacity: 1, y: 0 }}
                        transition={reduceAnimations ? {} : { duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <CreditCard className="w-8 h-8 md:w-10 md:h-10 text-action animate-pulse" />
                            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-accent" style={{ animationDelay: '0.5s' }} />
                        </div>
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
                                
                                return (
                                    <motion.div
                                        key={acc.id}
                                        initial={reduceAnimations ? {} : { opacity: 0, y: 30 }}
                                        animate={reduceAnimations ? {} : { opacity: 1, y: 0 }}
                                        transition={reduceAnimations ? {} : { delay: index * 0.1, duration: 0.5 }}
                                        whileHover={reduceAnimations ? {} : { y: -8, scale: 1.03 }}
                                        className="relative group"
                                    >
                                        {/* Efecto de resplandor en hover */}
                                        {!reduceAnimations && (
                                            <div 
                                                className="absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10"
                                                style={{ background: bankStyle.gradient }}
                                            />
                                        )}
                                        
                                        {/* Tarjeta bancaria estilizada */}
                                        <div 
                                            className="relative rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm border-2 transition-all duration-300"
                                            style={{
                                                background: bankStyle.gradient,
                                                borderColor: bankStyle.accentColor + '40',
                                            }}
                                        >
                                            {/* Patrón de fondo decorativo */}
                                            <div className="absolute inset-0 opacity-10">
                                                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
                                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-2xl" />
                                            </div>

                                            {/* Líneas decorativas tipo tarjeta */}
                                            <div className="absolute top-0 left-0 w-full h-20 opacity-20">
                                                <div className="absolute top-4 left-4 w-12 h-1 bg-white rounded-full" />
                                                <div className="absolute top-8 left-4 w-8 h-1 bg-white rounded-full" />
                                            </div>

                                            {/* Contenido de la tarjeta */}
                                            <div className="relative z-10 p-6 md:p-8 min-h-[400px] flex flex-col">
                                                {/* Header del banco */}
                                                <div className="mb-6">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className="flex items-center gap-3">
                                                            <div 
                                                                className="p-3 rounded-xl backdrop-blur-sm border-2"
                                                                style={{
                                                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                                    borderColor: bankStyle.accentColor + '60',
                                                                }}
                                                            >
                                                                <Building2 className="w-6 h-6 md:w-7 md:h-7" style={{ color: bankStyle.textColor }} />
                                                            </div>
                                                            <div>
                                                                <h2 className="text-xl md:text-2xl font-black" style={{ color: bankStyle.textColor }}>
                                                                    {bankStyle.name}
                                                                </h2>
                                                                {acc.paymentMethod && (
                                                                    <p className="text-sm opacity-80" style={{ color: bankStyle.textColor }}>
                                                                        {acc.paymentMethod}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <Sparkles 
                                                            className="w-5 h-5 md:w-6 md:h-6 opacity-60" 
                                                            style={{ color: bankStyle.accentColor }} 
                                                        />
                                                    </div>
                                                </div>

                                                {/* Información de la cuenta */}
                                                <div className="flex-1 space-y-4">
                                                    {/* Titular */}
                                                    <div 
                                                        className="p-4 rounded-xl backdrop-blur-sm border-2"
                                                        style={{
                                                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                                            borderColor: bankStyle.accentColor + '40',
                                                        }}
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <div 
                                                                className="p-2 rounded-lg"
                                                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                                                            >
                                                                <User className="w-4 h-4 md:w-5 md:h-5" style={{ color: bankStyle.textColor }} />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-xs opacity-80 mb-1" style={{ color: bankStyle.textColor }}>Titular</p>
                                                                <p className="text-base md:text-lg font-bold break-words" style={{ color: bankStyle.textColor }}>
                                                                    {acc.accountHolder}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Número de cuenta/tarjeta */}
                                                    <div 
                                                        className="p-4 rounded-xl backdrop-blur-sm border-2"
                                                        style={{
                                                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                                            borderColor: bankStyle.accentColor + '40',
                                                        }}
                                                    >
                                                        <div className="flex items-center justify-between gap-3 mb-2">
                                                            <div className="flex items-center gap-2">
                                                                <CreditCard className="w-4 h-4 opacity-80" style={{ color: bankStyle.textColor }} />
                                                                <p className="text-xs opacity-80" style={{ color: bankStyle.textColor }}>
                                                                    {acc.card ? 'Tarjeta' : 'Cuenta'}
                                                                </p>
                                                            </div>
                                                            <button
                                                                onClick={() => copyToClipboard(acc.accountNumber || acc.card || '', acc.id, 'Número')}
                                                                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all duration-300 text-xs font-semibold border-2 hover:scale-105"
                                                                style={{
                                                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                                    borderColor: bankStyle.accentColor + '60',
                                                                    color: bankStyle.textColor,
                                                                }}
                                                                title="Copiar número"
                                                            >
                                                                {copiedId === `${acc.id}-Número` ? (
                                                                    <>
                                                                        <Check className="w-3.5 h-3.5" />
                                                                        <span>Copiado</span>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Copy className="w-3.5 h-3.5" />
                                                                        <span>Copiar</span>
                                                                    </>
                                                                )}
                                                            </button>
                                                        </div>
                                                        <p className="text-lg md:text-xl font-black font-mono tracking-wider break-all select-all" style={{ color: bankStyle.textColor }}>
                                                            {acc.card || acc.accountNumber}
                                                        </p>
                                                    </div>

                                                    {/* Clave interbancaria */}
                                                    {acc.interbankKey && (
                                                        <div 
                                                            className="p-4 rounded-xl backdrop-blur-sm border-2"
                                                            style={{
                                                                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                                                borderColor: bankStyle.accentColor + '40',
                                                            }}
                                                        >
                                                            <div className="flex items-center justify-between gap-3 mb-2">
                                                                <div className="flex items-center gap-2">
                                                                    <Hash className="w-4 h-4 opacity-80" style={{ color: bankStyle.textColor }} />
                                                                    <p className="text-xs opacity-80" style={{ color: bankStyle.textColor }}>CLABE</p>
                                                                </div>
                                                                <button
                                                                    onClick={() => copyToClipboard(acc.interbankKey || '', acc.id, 'CLABE')}
                                                                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all duration-300 text-xs font-semibold border-2 hover:scale-105"
                                                                    style={{
                                                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                                        borderColor: bankStyle.accentColor + '60',
                                                                        color: bankStyle.textColor,
                                                                    }}
                                                                    title="Copiar CLABE"
                                                                >
                                                                    {copiedId === `${acc.id}-CLABE` ? (
                                                                        <>
                                                                            <Check className="w-3.5 h-3.5" />
                                                                            <span>Copiado</span>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Copy className="w-3.5 h-3.5" />
                                                                            <span>Copiar</span>
                                                                        </>
                                                                    )}
                                                                </button>
                                                            </div>
                                                            <p className="text-base md:text-lg font-bold font-mono tracking-wider break-all select-all" style={{ color: bankStyle.textColor }}>
                                                                {acc.interbankKey}
                                                            </p>
                                                        </div>
                                                    )}

                                                    {/* Concepto de pago */}
                                                    {acc.paymentConcept && (
                                                        <div 
                                                            className="p-4 rounded-xl backdrop-blur-sm border-2"
                                                            style={{
                                                                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                                                borderColor: bankStyle.accentColor + '40',
                                                            }}
                                                        >
                                                            <div className="flex items-start gap-3">
                                                                <div 
                                                                    className="p-2 rounded-lg"
                                                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                                                                >
                                                                    <FileText className="w-4 h-4 md:w-5 md:h-5" style={{ color: bankStyle.textColor }} />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-xs opacity-80 mb-1" style={{ color: bankStyle.textColor }}>Concepto de Pago</p>
                                                                    <p className="text-sm font-semibold break-words" style={{ color: bankStyle.textColor }}>
                                                                        {acc.paymentConcept}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Footer de la tarjeta */}
                                                <div className="mt-6 pt-4 border-t-2" style={{ borderColor: bankStyle.accentColor + '40' }}>
                                                    <p className="text-xs opacity-70 text-center" style={{ color: bankStyle.textColor }}>
                                                        Envía tu comprobante por WhatsApp
                                                    </p>
                                                </div>
                                            </div>
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
