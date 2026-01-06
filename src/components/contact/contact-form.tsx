"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

// Zod validation schema
const getContactFormSchema = (t: any) => z.object({
    nombre: z.string().min(2, t("errorName")),
    email: z.string().email(t("errorEmail")),
    telefono: z.string().min(10, t("errorPhone")),
    servicio: z.enum(["Roofing", "Siding", "Gutters", "Insurance Claim", "Other"], {
        errorMap: () => ({ message: t("errorService") })
    }),
    mensaje: z.string().min(10, t("errorMessage10")).optional().or(z.literal("")),
});

const WEBHOOK_URL = "https://devwebhookn8n.catalystsmartflow.cloud/webhook/skylinepro";

export function ContactForm() {
    const t = useTranslations("Contact");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(getContactFormSchema(t)),
    });

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);
        setIsError(false);
        setIsSuccess(false);

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            setIsSuccess(true);
            reset();
        } catch (error) {
            console.error("Error submitting form:", error);
            setIsError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
                <label htmlFor="nombre" className="block text-sm font-semibold text-slate-900 mb-2">
                    {t("formName")} <span className="text-red-600">{t("required")}</span>
                </label>
                <input
                    {...register("nombre")}
                    type="text"
                    id="nombre"
                    className="w-full px-4 py-3 border border-slate-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-bronze focus:border-transparent"
                    placeholder={t("formNamePlaceholder")}
                />
                {errors.nombre && (
                    <p className="mt-1 text-sm text-red-600">{errors.nombre.message as string}</p>
                )}
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                    {t("formEmail")} <span className="text-red-600">{t("required")}</span>
                </label>
                <input
                    {...register("email")}
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-slate-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-bronze focus:border-transparent"
                    placeholder={t("formEmailPlaceholder")}
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message as string}</p>
                )}
            </div>

            {/* Phone */}
            <div>
                <label htmlFor="telefono" className="block text-sm font-semibold text-slate-900 mb-2">
                    {t("formPhone")} <span className="text-red-600">{t("required")}</span>
                </label>
                <input
                    {...register("telefono")}
                    type="tel"
                    id="telefono"
                    className="w-full px-4 py-3 border border-slate-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-bronze focus:border-transparent"
                    placeholder={t("formPhonePlaceholder")}
                />
                {errors.telefono && (
                    <p className="mt-1 text-sm text-red-600">{errors.telefono.message as string}</p>
                )}
            </div>

            {/* Service */}
            <div>
                <label htmlFor="servicio" className="block text-sm font-semibold text-slate-900 mb-2">
                    {t("formService")} <span className="text-red-600">{t("required")}</span>
                </label>
                <select
                    {...register("servicio")}
                    id="servicio"
                    className="w-full px-4 py-3 border border-slate-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-bronze focus:border-transparent bg-white"
                >
                    <option value="">{t("formSelectService")}</option>
                    <option value="Roofing">{t("formServiceRoofing")}</option>
                    <option value="Siding">{t("formServiceSiding")}</option>
                    <option value="Gutters">{t("formServiceGutters")}</option>
                    <option value="Insurance Claim">{t("formServiceInsurance")}</option>
                    <option value="Other">{t("formServiceOther")}</option>
                </select>
                {errors.servicio && (
                    <p className="mt-1 text-sm text-red-600">{errors.servicio.message as string}</p>
                )}
            </div>

            {/* Message */}
            <div>
                <label htmlFor="mensaje" className="block text-sm font-semibold text-slate-900 mb-2">
                    {t("formMessage")}
                </label>
                <textarea
                    {...register("mensaje")}
                    id="mensaje"
                    rows={5}
                    className="w-full px-4 py-3 border border-slate-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-bronze focus:border-transparent resize-none"
                    placeholder={t("formMessagePlaceholder")}
                />
                {errors.mensaje && (
                    <p className="mt-1 text-sm text-red-600">{errors.mensaje.message as string}</p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-bronze text-slate-900 font-semibold rounded-sm hover:bg-bronze/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>{t("formSubmitting")}</span>
                    </>
                ) : (
                    <span>{t("formSubmit")}</span>
                )}
            </button>

            {/* Success Message */}
            {isSuccess && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-sm flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-semibold text-green-900">{t("successTitle")}</p>
                        <p className="text-sm text-green-700">{t("successMessage")}</p>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {isError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-sm flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-semibold text-red-900">{t("errorTitle")}</p>
                        <p className="text-sm text-red-700">
                            {t("errorMessage")}{" "}
                            <a href="tel:+19145550123" className="underline font-medium">
                                (914) 555-0123
                            </a>
                        </p>
                    </div>
                </div>
            )}
        </form>
    );
}
