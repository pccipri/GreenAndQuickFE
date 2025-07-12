"use client";

import { useEffect, useState } from "react";
import PolicyAccordion from "../components/policyAccordion";


// Has the same type as declared in the PolicyAccordion component
interface PolicySection {
    id: number;
    title: string;
    introductiveText?: string;
    listItems?: string[];
    conclusionText?: string;
}

interface PrivacyPolicyData {
    policySections: PolicySection[];
}

const PrivacyPolicy = () => {
    const [policyData, setPolicyData] = useState<PrivacyPolicyData | null>(null);

    useEffect(() => {
        fetch("/privacyPolicy.json")
            .then((res) => res.json())
            .then((data) => setPolicyData(data));
    }, []);

    // Display a loading message if the data isn't loaded yet
    if (!policyData) return <div>Loading...</div>;

    return (
        <div className="privacyPolicy"
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                backgroundColor: 'white',
                color: 'black',
                padding: '50px'
            }}
        >
            <h1>Terms of Service</h1>
            <p style={{ margin: "40px 0" }}>
                By using Green & Quick, you agree to the following terms...
            </p>

            <div className="accordionContainer"
                style={{
                    width: '100%',
                    height: '100%',
                }}
            >
                {policyData.policySections.map((section) => (
                    <PolicyAccordion
                        key={section.id}    // The same value as the section's id
                        id={section.id}
                        title={section.title}
                        introductiveText={section.introductiveText}
                        listItems={section.listItems}
                        conclusionText={section.conclusionText}
                    />
                ))}
            </div>
        </div>
    );
};

export default PrivacyPolicy;