import React, { useRef, useState, useEffect } from "react";
import * as Tone from "tone";

type WaveformSVGProps = {
    player: Tone.Player | null;
    width?: number;
    height?: number;
    samples?: number;
    mirror?: boolean;
    stroke: string;
    strokeWidth?: number;
}

export function WaveformSVG({ player, width = 200, height = 120, samples = 256, mirror = true, stroke, strokeWidth = 1.5 }: WaveformSVGProps) {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const pathRef = useRef<SVGPathElement | null>(null);
    const analyserRef = useRef<Tone.Analyser | null>(null);
    const rafRef = useRef<number | null>(null);
    const mountedRef = useRef(true);
    const playerRef = useRef<Tone.Player | null>(null);

    useEffect(() => {
        mountedRef.current = true;
        analyserRef.current = new Tone.Analyser('waveform', samples);
        if (player){
            player.connect(analyserRef.current)
            playerRef.current = player;
        }

        const draw = () => {
            const analyser = analyserRef.current;
            const pathEl = pathRef.current;
            if (analyser && pathEl) {
                const values = analyser.getValue() as Float32Array;
                const w = width;
                const h = height;
                const centerY = h / 2;
                const len = values.length;
                const step = w / (len - 1 || 1);
                let d = "";
                for (let i = 0; i < len; i++) {
                    const x = i * step;
                    const sample = values[i];
                    const y = centerY - sample * (h / 2) * 0.95;
                    if (i === 0) d += `M ${x.toFixed(2)} ${y.toFixed(2)}`;
                    else d += `L ${x.toFixed(2)} ${y.toFixed(2)}`;
                }
                if (mirror) {
                    for (let i = len - 1; i >= 0; i--) {
                        const x = i * step;
                        const sample = values[i];
                        const y = centerY + sample * (h / 2) * 0.95;
                        d += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
                    }
                    d += ' Z';
                    pathEl.setAttribute('d', d);
                    pathEl.setAttribute('fill', 'hex(#FFFFFF)');
                    pathEl.setAttribute('stroke', stroke);
                    pathEl.setAttribute('stroke-width', String(strokeWidth));
                }
                else {
                    pathEl.setAttribute('d', d);
                    pathEl.setAttribute('fill', 'none');
                    pathEl.setAttribute('stroke', stroke);
                    pathEl.setAttribute('stroke-width', String(strokeWidth));
                }
            }
            rafRef.current = requestAnimationFrame(draw);
        };
        rafRef.current = requestAnimationFrame(draw);
        return () => {
            mountedRef.current = false;
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            try {
                playerRef.current?.disconnect();
                analyserRef.current?.disconnect();
                playerRef.current?.dispose();
                analyserRef.current?.dispose();
            } catch (e) { }
        };
    }, [player, width, height, samples, mirror, stroke, strokeWidth]);
    return (
        <div>
            <svg ref={svgRef} width={width} height={height} style={{ display: 'block' }}>
                <path ref={pathRef} d='' />
            </svg>
        </div>
    )
}

export default WaveformSVG;