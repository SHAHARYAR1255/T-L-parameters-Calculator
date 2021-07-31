import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function Corona() {
    const [initialValues, setInitialValues] = useState({ radius: "", distance: "", Barometric: "", temperature: "", phase: "" });
    const [isSubmit, setIsSubmit] = useState(false);
    const [Pc, setPc] = useState(0);

    const handleChange = (e) => {
        setInitialValues({ ...initialValues, [e.target.name]: e.target.value });
        console.log('cahnging')
    }
    // const onClear = () => {
    //     console.log('clear');
    //     setInitialValues({ radius: "", distance: "", Barometric: "", temperature: "", phase: "" });
    // }

    const handleSubmit = (e) => {
        setIsSubmit(!isSubmit);
        e.preventDefault();
        const { radius, distance, Barometric, temperature, phase } = initialValues;
        //surface factor for stranded conductors
        const m = 0.85;
        //21.21 % KV/cm rms
        const g = 21.21;
        //Air density
        const s = (3.92 * Barometric) / (273 + temperature);
        const f = 50;

        const Vc = m * g * s * radius * Math.log(distance / radius);
        console.log('Visual critical voltage', Vc)
        //for Pc power loss due to corona

        let Pc = 242.2 * ((f + 25) / s) * Math.sqrt(radius / distance) * (phase - Vc) * (phase - Vc) * Math.pow(10, -5);
        if (phase > Vc) {
            setPc(Pc);
            console.log(Pc, 'The power loss due to corona is %f kW/km/phase')
        } else {
            Pc = 0;
            setPc(Pc);
            console.log(Pc)

        }
    }

    return (

        <div className="container">
            <h2>Calculate Corona Power loss</h2>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <FormGroup>
                    <Label for="radius">Conductor Radius</Label>
                    <Input type="number" name="radius" id="radius" placeholder="'Enter the Conuctor Radius in cm:" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="distance">Distance between conductor</Label>
                    <Input type="number" name="distance" id="distance" placeholder="'Enter the Distance between the conductors in cm" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="Barometric">Barometric Pressure:</Label>
                    <Input type="number" name="Barometric" id="Barometric" placeholder="Barometric Pressure:" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="temperature">Temperature of the surrounding</Label>
                    <Input type="number" name="temperature" id="temperature" placeholder="Enter the Temperature of the surrounding in Celsius" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="phase">phase voltage</Label>
                    <Input type="number" name="phase" id="phase" placeholder="Enter the Phase voltage in KV of the transmission system:" onChange={handleChange} />
                </FormGroup>
                <Button>Submit</Button>
            </Form><br />
            <div className="container">
                {!isSubmit ? (null) : (<h2>Corona power loss is : {Pc}</h2>)}
            </div>
        </div>
    )
}

export default Corona
