"use client"

import { FC, ReactNode } from "react";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from "@mui/material";


interface PolicyAccordionProps {
    id: number;
    title: string;
    introductiveText?: string;
    listItems?: ReactNode[];
    conclusionText?: string;
}

const PolicyAccordion: FC<PolicyAccordionProps> = ({ id, title, introductiveText, listItems, conclusionText }) => {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${id}-content`}
                id={`${id}-header`}
            >
                <Typography component="span"><h4>{title}</h4></Typography>
            </AccordionSummary>
            <AccordionDetails style={{ padding: '20px' }}>
                {introductiveText && <p>{introductiveText}</p>}

                {listItems && listItems.length > 0 && (
                    <ul style={{ margin: '15px 30px' }}>
                        {listItems.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                )}

                {conclusionText && <p>{conclusionText}</p>}

                {/* For the contact information */}
                {id === 11 && (
                    <>
                        <p>For questions about these Terms:</p>
                        <h3 style={{ margin: '20px 0' }}>Green &amp; Quick</h3>
                        <p style={{ marginBottom: '10px' }}>
                            Email: <Link href="mailto:support@greenquick.com">support@greenquick.com</Link>
                        </p>
                        <p>Address: 123 Green St, Eco City, Romania</p>
                    </>
                )}
            </AccordionDetails>
        </Accordion>
    );
};

export default PolicyAccordion;