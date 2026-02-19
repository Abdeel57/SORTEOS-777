import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { getSettings, adminUpdateSettings } from '../../services/api';
import { Settings, AppearanceSettings } from '../../types';
import { Plus, Trash2, Save, RefreshCw, Palette, Globe, CreditCard, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Spinner from '../../components/Spinner';
import { useTheme } from '../../contexts/ThemeContext';
import ImageUploaderAdvanced from '../../components/admin/ImageUploaderAdvanced';

const OptimizedSectionWrapper: React.FC<{ 
    title: string, 
    icon: React.ElementType, 
    children: React.ReactNode,
    description?: string 
}> = ({ title, icon: Icon, children, description }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 md:p-6 mb-6"
    >
        <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-200">
            <div className="p-2 bg-blue-100 rounded-xl">
                <Icon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
                <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                {description && <p className="text-sm text-gray-600">{description}</p>}
            </div>
        </div>
        {children}
    </motion.div>
);

const OptimizedAdminSettingsPage = () => {
    const { register, control, handleSubmit, reset, formState: { isSubmitting, isDirty } } = useForm<Settings>();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { updateAppearance } = useTheme();

    const { fields: paymentFields, append: appendPayment, remove: removePayment } = useFieldArray({ control, name: "paymentAccounts" });
    const { fields: faqFields, append: appendFaq, remove: removeFaq } = useFieldArray({ control, name: "faqs" });

    useEffect(() => {
        getSettings().then(data => {
            reset(data);
            setLoading(false);
        });
    }, [reset]);
    
    const onSubmit = async (data: Settings) => {
        setSaving(true);
        try {
            const result = await adminUpdateSettings(data);
            reset(result);
            
            if (result.appearance) {
                updateAppearance(result.appearance);
            }
            
            alert('Configuración guardada con éxito');
        } catch (error) {
            alert('Error al guardar la configuración');
        } finally {
            setSaving(false);
        }
    };

    const inputClasses = "w-full mt-1 p-3 border border-gray-300 rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200";
    const labelClasses = "block text-sm font-semibold text-gray-700 mb-2";

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <Spinner />
                    <p className="mt-4 text-gray-600">Cargando configuración...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header compacto */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Configuración</h1>
                    <p className="text-gray-600 text-sm">Personaliza tu plataforma de rifas</p>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 text-sm"
                    >
                        <RefreshCw className="w-4 h-4" />
                        <span className="hidden sm:inline">Actualizar</span>
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Información General */}
                <OptimizedSectionWrapper
                    title="Información General"
                    icon={Globe}
                    description="Configuración básica de tu plataforma"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={labelClasses}>Nombre del Sitio</label>
                            <input {...register('siteName')} className={inputClasses} />
                        </div>
                        <div>
                            <label className={labelClasses}>Email de Contacto</label>
                            <input {...register('contactEmail')} type="email" className={inputClasses} />
                        </div>
                        <div className="md:col-span-2">
                            <label className={labelClasses}>Descripción del Sitio</label>
                            <textarea {...register('siteDescription')} rows={3} className={inputClasses} />
                        </div>
                    </div>
                </OptimizedSectionWrapper>

                {/* Apariencia */}
                <OptimizedSectionWrapper
                    title="Apariencia"
                    icon={Palette}
                    description="Personaliza los colores y logo de tu plataforma"
                >
                    <div className="space-y-4">
                        <div>
                            <label className={labelClasses}>Logo del Sitio</label>
                            <Controller
                                name="appearance.logo"
                                control={control}
                                render={({ field }) => (
                                    <ImageUploaderAdvanced
                                        image={field.value || ''}
                                        onChange={field.onChange}
                                        maxWidth={300}
                                        maxHeight={100}
                                        quality={0.8}
                                    />
                                )}
                            />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className={labelClasses}>Color Primario</label>
                                <input {...register('appearance.primaryColor')} type="color" className="w-full h-12 rounded-xl border border-gray-300" />
                            </div>
                            <div>
                                <label className={labelClasses}>Color Secundario</label>
                                <input {...register('appearance.secondaryColor')} type="color" className="w-full h-12 rounded-xl border border-gray-300" />
                            </div>
                            <div>
                                <label className={labelClasses}>Color de Acento</label>
                                <input {...register('appearance.accentColor')} type="color" className="w-full h-12 rounded-xl border border-gray-300" />
                            </div>
                        </div>
                    </div>
                </OptimizedSectionWrapper>

                {/* Cuentas de Pago */}
                <OptimizedSectionWrapper
                    title="Métodos de Pago"
                    icon={CreditCard}
                    description="Configura los métodos de pago con estilos personalizados por banco"
                >
                    <div className="space-y-4">
                        {paymentFields.map((field, index) => (
                            <div key={field.id} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-200 shadow-lg">
                                <div className="flex items-center justify-between mb-6">
                                    <h4 className="text-lg font-bold text-gray-800">Método de Pago {index + 1}</h4>
                                    {paymentFields.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removePayment(index)}
                                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-200"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClasses}>Banco *</label>
                                        <select {...register(`paymentAccounts.${index}.bank`)} className={inputClasses}>
                                            <option value="">Selecciona un banco</option>
                                            <option value="BBVA">BBVA</option>
                                            <option value="Banorte">Banorte</option>
                                            <option value="Santander">Santander</option>
                                            <option value="Banamex">Banamex</option>
                                            <option value="Citibanamex">Citibanamex</option>
                                            <option value="HSBC">HSBC</option>
                                            <option value="Scotiabank">Scotiabank</option>
                                            <option value="Banregio">Banregio</option>
                                            <option value="Inbursa">Inbursa</option>
                                            <option value="Banco Azteca">Banco Azteca</option>
                                            <option value="Bancoppel">Bancoppel</option>
                                            <option value="OXXO">OXXO</option>
                                            <option value="SPEI">SPEI</option>
                                            <option value="Otro">Otro</option>
                                        </select>
                                        <p className="text-xs text-gray-500 mt-1">El banco determinará el estilo de la tarjeta</p>
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Método de Pago *</label>
                                        <select {...register(`paymentAccounts.${index}.paymentMethod`)} className={inputClasses}>
                                            <option value="">Selecciona método</option>
                                            <option value="Transferencia">Transferencia</option>
                                            <option value="Depósito">Depósito</option>
                                            <option value="SPEI">SPEI</option>
                                            <option value="OXXO Pay">OXXO Pay</option>
                                            <option value="Tarjeta">Tarjeta</option>
                                            <option value="Efectivo">Efectivo</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Número de Tarjeta (Opcional)</label>
                                        <input 
                                            {...register(`paymentAccounts.${index}.card`)} 
                                            className={inputClasses}
                                            placeholder="Ej: 1234 5678 9012 3456"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Si es tarjeta, ingresa el número completo</p>
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Número de Cuenta / CLABE *</label>
                                        <input 
                                            {...register(`paymentAccounts.${index}.accountNumber`)} 
                                            className={inputClasses}
                                            placeholder="Ej: 012345678901234567"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Clave Interbancaria (CLABE) (Opcional)</label>
                                        <input 
                                            {...register(`paymentAccounts.${index}.interbankKey`)} 
                                            className={inputClasses}
                                            placeholder="Ej: 012345678901234567"
                                            maxLength={18}
                                        />
                                        <p className="text-xs text-gray-500 mt-1">18 dígitos para transferencias SPEI</p>
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Concepto de Pago *</label>
                                        <input 
                                            {...register(`paymentAccounts.${index}.paymentConcept`)} 
                                            className={inputClasses}
                                            placeholder="Ej: Pago de rifa - Sorteos 777"
                                            required
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Concepto que aparecerá en el comprobante</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className={labelClasses}>Titular de la Cuenta *</label>
                                        <input 
                                            {...register(`paymentAccounts.${index}.accountHolder`)} 
                                            className={inputClasses}
                                            placeholder="Nombre completo del titular"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => appendPayment({ 
                                bank: '', 
                                paymentMethod: '', 
                                card: '', 
                                accountNumber: '', 
                                interbankKey: '', 
                                paymentConcept: '', 
                                accountHolder: '' 
                            })}
                            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-all duration-200 flex items-center justify-center space-x-2"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Agregar Método de Pago</span>
                        </button>
                    </div>
                </OptimizedSectionWrapper>

                {/* Preguntas Frecuentes */}
                <OptimizedSectionWrapper
                    title="Preguntas Frecuentes"
                    icon={HelpCircle}
                    description="Mantén informados a tus usuarios"
                >
                    <div className="space-y-4">
                        {faqFields.map((field, index) => (
                            <div key={field.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-semibold text-gray-700">Pregunta {index + 1}</h4>
                                    <button
                                        type="button"
                                        onClick={() => removeFaq(index)}
                                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-200"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className={labelClasses}>Pregunta</label>
                                        <input {...register(`faqs.${index}.question`)} className={inputClasses} />
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Respuesta</label>
                                        <textarea {...register(`faqs.${index}.answer`)} rows={3} className={inputClasses} />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => appendFaq({ question: '', answer: '' })}
                            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-all duration-200 flex items-center justify-center space-x-2"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Agregar Pregunta Frecuente</span>
                        </button>
                    </div>
                </OptimizedSectionWrapper>

                {/* Botones de acción */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                        {isDirty && "Tienes cambios sin guardar"}
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || saving}
                            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting || saving ? (
                                <>
                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                    <span>Guardando...</span>
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    <span>Guardar Configuración</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default OptimizedAdminSettingsPage;
