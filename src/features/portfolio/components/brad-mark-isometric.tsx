'use client';

import { useEffect, useId, useRef } from 'react';
import type { Transition } from 'motion/react';
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';

import { metalClickSound } from '@/lib/soundcn/metal-click';
import { useSound } from '@/hooks/soundcn/use-sound';

const transition: Transition = {
    type: 'spring',
    mass: 0.5,
    damping: 18,
    stiffness: 200,
};

/**
 * Designed by ncdai in Figma.
 *
 * Figma plugins used:
 * - Fast Isometric Plugin
 *   https://www.figma.com/community/plugin/1249759048471403961
 *
 * - 3D Vector Plugin
 *   https://www.figma.com/community/plugin/1268139850904385517
 *
 * Inspired by tailwindcss.com.
 */

/**
 * Implementation notes:
 *
 * The SVG is built in layers to preserve the isometric 3D effect:
 *
 * 1. `stroke` contains the back/wall geometry of both letters.
 * 2. `faceFill` contains the solid top faces of B and M.
 * 3. `faceStrokeB` and `faceStrokeM` contain only the visible front
 *    outlines of each top face, so they can be rendered above the fill
 *    without allowing the back geometry to overlap the faces.
 *
 * Important:
 * Do not merge `faceStrokeB` / `faceStrokeM` back into `stroke`.
 * The rendering order is intentional:
 *
 *     back geometry
 *     → face fill
 *     → face pattern
 *     → face outline + highlight
 *
 * The face paths were exported from Figma and manually organized to
 * support the pressed/unpressed Motion variants.
 */
export function BradMarkIsometric() {
    const id = useId();

    // Keep these IDs separate because each face/outline is reused through <use>
    // and must remain independently addressable for layering and animation.
    const ids = {
        facePattern: `ncdai-face-pattern-${id}`,
        faceFill: `ncdai-face-fill-${id}`,
        stroke: `ncdai-stroke-${id}`,
        radialGradient: `ncdai-radial-gradient-${id}`,
        // Top-face outlines are separated from `stroke` intentionally.
        // If included in `stroke`, they would be painted before the face fill
        // and would disappear during the pressed animation.
        faceStrokeB: `ncdai-face-stroke-b-${id}`,
        faceStrokeM: `ncdai-face-stroke-m-${id}`,
    };

    const ref = useRef<SVGSVGElement>(null);

    const [play] = useSound(metalClickSound);

    const shouldReduceMotion = useReducedMotion();
    const isInView = useInView(ref, { margin: '80px' });

    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    const cx = useSpring(useTransform(mouseX, [0, 1], [0, 556]), {
        stiffness: 300,
        damping: 30,
        mass: 0.1,
    });

    const cy = useSpring(useTransform(mouseY, [0, 1], [0, 354]), {
        stiffness: 300,
        damping: 30,
        mass: 0.1,
    });

    useEffect(() => {
        if (shouldReduceMotion || !isInView) {
            return;
        }

        if (window.matchMedia('(hover: none)').matches) {
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX / window.innerWidth);
            mouseY.set(e.clientY / window.innerHeight);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [shouldReduceMotion, isInView, mouseX, mouseY]);

    return (
        <motion.svg
            ref={ref}
            className="h-auto w-full touch-manipulation overflow-visible [--pattern:color-mix(in_oklab,var(--foreground)_12%,var(--background))] [--stroke:color-mix(in_oklab,var(--foreground)_16%,var(--background))]"
            viewBox="0 0 556 354"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
            initial="normal"
            whileTap="pressed"
            onTap={() => play()}
        >
            <defs>
                <pattern id={ids.facePattern} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M-1 1l2 -2M0 10l10 -10M9 11l2 -2" stroke="var(--pattern)" strokeWidth="1" />
                </pattern>

                <motion.g
                    id={ids.faceFill}
                    variants={{
                        normal: {
                            y: 0,
                        },
                        pressed: {
                            y: 16,
                        },
                    }}
                    transition={transition}
                >
                    <path d="M197.331 319.914L24.6201 220.2L128.246 160.371L162.788 180.314L197.331 160.371L300.957 220.2L266.414 240.143L300.957 260.086L197.331 319.914ZM128.246 240.143L195.949 201.054L161.407 181.112L93.7043 220.2L128.246 240.143ZM197.331 280.028L265.033 240.94L230.491 220.997L162.788 260.085L197.331 280.028Z" />
                    <path d="M377.242 216.04L204.531 116.326L239.073 96.3829L273.615 116.326L308.158 96.383L342.7 116.326L377.241 96.3831L411.783 116.326L377.241 136.269L342.7 116.326L308.158 136.269L411.784 196.097L377.242 216.04ZM515.41 136.269L411.784 76.4401L377.241 96.3831L342.699 76.4402L377.242 56.4972L342.7 36.5543L377.242 16.6113L549.952 116.326L515.41 136.269Z" />
                </motion.g>

                <motion.path
                    id={ids.stroke}
                    variants={{
                        normal: {
                            d: [
                                // B
                                'M300.96 220.199L266.418 240.142V265.142L300.96 245.199V220.199Z',
                                'M300.954 260.083L197.328 319.912L24.6172 220.197V245.197L197.328 344.912L300.954 285.083V260.083Z',
                                'M195.949 201.054L161.407 181.111L93.7041 220.199V245.199L161.407 206.111L195.949 226.054V201.054Z',
                                'M265.035 240.939L230.493 220.996L162.79 260.084V285.084L230.493 245.996L265.035 265.939V240.939Z',

                                // M
                                'M411.781 116.324L377.239 136.267L342.697 116.324L308.155 136.267V161.267L342.697 141.324L377.239 161.267L411.781 141.324V116.324Z',
                                'M411.783 196.096L377.241 216.039L204.53 116.324V141.324L377.241 241.039L411.783 221.096V196.096Z',
                                'M377.24 56.4956L342.698 36.5527V61.5527L377.24 81.4956V56.4956Z',
                                'M549.951 116.325L515.409 136.268L411.783 76.4395L377.24 96.3825L342.698 76.4396V101.44L377.24 121.382L411.783 101.439L515.409 161.268L549.951 141.325V116.325Z',
                                'M377.243 216.038L204.532 116.324L239.074 96.381L273.616 116.324L308.158 96.381L342.701 116.324L377.242 96.3811L411.784 116.324L377.242 136.267L342.701 116.324L308.158 136.267L411.785 196.095L377.243 216.038ZM515.411 136.267L411.785 76.4381L377.242 96.3811L342.7 76.4383L377.243 56.4953L342.701 36.5524L377.243 16.6094L549.953 116.324L515.411 136.267Z',
                            ].join(''),
                        },
                        pressed: {
                            d: [
                                // B
                                'M301.241 236.996L266.698 256.939V264.939L301.241 244.996V236.996Z',
                                'M301.242 276.886L197.616 336.715L24.9053 237V245L197.616 344.715L301.242 284.886V276.886Z',
                                'M196.234 217.855L161.692 197.912L93.9893 237V245L161.692 205.912L196.234 225.855V217.855Z',
                                'M265.316 257.74L230.774 237.797L163.071 276.885V284.885L230.774 245.797L265.316 265.74V257.74Z',

                                // M
                                'M411.778 133.328L377.236 153.271L342.694 133.328L308.152 153.271V161.271L342.694 141.328L377.236 161.271L411.778 141.328V133.328Z',
                                'M411.78 213.1L377.238 233.043L204.527 133.328V141.328L377.238 241.043L411.78 221.1V213.1Z',
                                'M377.237 73.4995L342.695 53.5566V61.5566L377.237 81.4995V73.4995Z',
                                'M549.948 133.329L515.406 153.272L411.78 93.4434L377.237 113.386L342.695 93.4435V101.444L377.237 121.386L411.78 101.443L515.406 161.272L549.948 141.329V133.329Z',
                                'M377.235 233.042L204.524 133.328L239.067 113.385L273.609 133.328L308.151 113.385L342.693 133.328L377.235 113.385L411.776 133.328L377.235 153.271L342.693 133.328L308.151 153.271L411.777 213.099L377.235 233.042ZM515.403 153.271L411.777 93.442L377.235 113.385L342.693 93.4422L377.235 73.4992L342.693 53.5563L377.235 33.6133L549.946 133.328L515.403 153.271Z',
                            ].join(''),
                        },
                    }}
                    transition={transition}
                />

                <motion.path
                    id={ids.faceStrokeB}
                    variants={{
                        normal: {
                            d: 'M197.33 319.914L24.6191 220.2L128.245 160.371L162.787 180.314L197.33 160.371L300.956 220.2L266.413 240.143L300.956 260.086L197.33 319.914ZM128.245 240.143L195.948 201.054L161.406 181.112L93.7034 220.2L128.245 240.143ZM197.33 280.028L265.032 240.94L230.49 220.997L162.787 260.085L197.33 280.028Z',
                        },
                        pressed: {
                            d: 'M197.617 336.715L24.9062 237L128.532 177.172L163.074 197.115L197.617 177.172L301.243 237L266.701 256.943L301.243 276.886L197.617 336.715ZM128.533 256.943L196.235 217.855L161.693 197.912L93.9905 237L128.533 256.943ZM197.617 296.829L265.319 257.741L230.777 237.798L163.074 276.886L197.617 296.829Z',
                        },
                    }}
                    transition={transition}
                />

                <motion.path
                    id={ids.faceStrokeM}
                    variants={{
                        normal: {
                            d: 'M377.243 216.038L204.532 116.324L239.074 96.381L273.616 116.324L308.158 96.381L342.701 116.324L377.242 96.3811L411.784 116.324L377.242 136.267L342.701 116.324L308.158 136.267L411.785 196.095L377.243 216.038ZM515.411 136.267L411.785 76.4381L377.242 96.3811L342.7 76.4383L377.243 56.4953L342.701 36.5524L377.243 16.6094L549.953 116.324L515.411 136.267Z',
                        },
                        pressed: {
                            d: 'M377.235 233.042L204.524 133.328L239.067 113.385L273.609 133.328L308.151 113.385L342.693 133.328L377.235 113.385L411.776 133.328L377.235 153.271L342.693 133.328L308.151 153.271L411.777 213.099L377.235 233.042ZM515.403 153.271L411.777 93.442L377.235 113.385L342.693 93.4422L377.235 73.4992L342.693 53.5563L377.235 33.6133L549.946 133.328L515.403 153.271Z',
                        },
                    }}
                    transition={transition}
                />

                <motion.radialGradient id={ids.radialGradient} cx={cx} cy={cy} r="200" gradientUnits="userSpaceOnUse">
                    <stop className="dark:[stop-color:#fff]" stopColor="var(--color-zinc-700)" />
                    <stop
                        className="dark:[stop-color:var(--color-zinc-600)]"
                        offset="1"
                        stopColor="var(--color-zinc-400)"
                        stopOpacity="0"
                    />
                </motion.radialGradient>
            </defs>

            <g className="stroke-line" strokeWidth="1" strokeDasharray="4 2">
                <path d="M-443 -25L556 552" />
                <path d="M-84 -25L888 536" />
                <path d="M-107.515 520.93L890.108 -55.1146" />
            </g>

            <g className="fill-background" fillRule="evenodd" clipRule="evenodd">
                {/* Pared Lateral de B */}
                <motion.path
                    variants={{
                        normal: {
                            d: 'M300.955 260.081L197.329 319.91L24.6182 220.195V245.195L197.329 344.91L300.955 285.081V260.081Z',
                        },
                        pressed: {
                            d: 'M301.243 276.886L197.617 336.715L24.9062 237V245L197.617 344.715L301.243 284.886V276.886Z',
                        },
                    }}
                    transition={transition}
                />

                {/* Parte Interna del circulo inferior de la B */}
                <motion.path
                    variants={{
                        normal: {
                            d: 'M265.036 240.937L230.494 220.994L162.791 260.082V285.082L230.494 245.994L265.036 265.937V240.937Z',
                        },
                        pressed: {
                            d: 'M265.318 257.74L230.776 237.797L163.073 276.885V284.885L230.776 245.797L265.318 265.74V257.74Z',
                        },
                    }}
                    transition={transition}
                />
            </g>

            <use href={`#${ids.stroke}`} stroke="var(--stroke)" />
            <use href={`#${ids.stroke}`} stroke={`url(#${ids.radialGradient})`} />

            <use href={`#${ids.faceFill}`} className="fill-background" />
            <use href={`#${ids.faceFill}`} fill={`url(#${ids.facePattern})`} />

            <use href={`#${ids.faceStrokeB}`} stroke="var(--stroke)" />
            <use href={`#${ids.faceStrokeB}`} stroke={`url(#${ids.radialGradient})`} />

            <use href={`#${ids.faceStrokeM}`} stroke="var(--stroke)" />
            <use href={`#${ids.faceStrokeM}`} stroke={`url(#${ids.radialGradient})`} />
        </motion.svg>
    );
}
