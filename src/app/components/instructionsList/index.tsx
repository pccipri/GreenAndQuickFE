"use client"

import { FC } from "react";

interface InstructionsListProps {
    instruction: string;
    imageSrc?: string;
    imageAlt?: string;
}

const InstructionsList: FC<InstructionsListProps> = ({ instruction, imageSrc, imageAlt }) => {
    return (
        <li style={{ marginBottom: '1rem' }}>
            <div>{instruction}</div>
            {imageSrc && (
                <img
                    src={imageSrc}
                    alt={imageAlt ?? 'Instruction step image'}
                    style={{
                        display: 'block',
                        marginTop: '0.5rem',
                        maxWidth: '100%',
                    }}
                />
            )}
        </li>
    );
};

export default InstructionsList;