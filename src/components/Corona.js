import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function Corona() {
    const [initialValues, setInitialValues] = useState({ radius: 0, distance: 0, Barometric: 0, temperature: 0, phase: 0 });
    const [isSubmit, setIsSubmit] = useState(false);
    const [Pc, setPc] = useState(0);
    const [criticalVoltage, setCriticalVoltage] = useState(0);
    const handleReset = () =>{
        setInitialValues({ radius: 0, distance: 0, Barometric: 0, temperature: 0, phase: 0 });
        setIsSubmit(false);
        setPc(0);
        setCriticalVoltage(0)
    }
    const handleChange = (e) => {
        setInitialValues({ ...initialValues, [e.target.name]: e.target.value });
        console.log('cahnging')
    }
    // const onClear = () => {
    //     console.log('clear');
    //     setInitialValues({ radius: "", distance: "", Barometric: "", temperature: "", phase: "" });
    // }

    const handleSubmit = (e) => {
        setIsSubmit(true);
        e.preventDefault();
        const { radius, distance, Barometric, temperature, phase } = initialValues;
        //surface factor for stranded conductors
        const m = 0.85;
        //21.21 % KV/cm rms
        const g = 21.21;
        //Air density
        const s = (3.92 * Barometric) / (273 + temperature);
        const f = 50;

        const Vc = m * g * s * radius * Math.log(distance / radius)*100;
        // const Vc = 21E-6 * f*phase*phase*m / Math.pow(Math.log(distance/radius), 2)
        console.log('Visual critical voltage', Vc);
        setCriticalVoltage(Vc);
        //for Pc power loss due to corona

        let Pc = 242.2 * ((f + 25) / s) * Math.sqrt(radius / distance) * Math.pow((phase - Vc),2) * Math.pow(10, -5);
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
                    <Input type="float" name="radius" id="radius" placeholder="'Enter the Conuctor Radius in cm:" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="distance">Distance between conductor</Label>
                    <Input type="float" name="distance" id="distance" placeholder="'Enter the Distance between the conductors in cm" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="Barometric">Barometric Pressure:</Label>
                    <Input type="float" name="Barometric" id="Barometric" placeholder="Barometric Pressure:" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="temperature">Temperature of the surrounding</Label>
                    <Input type="float" name="temperature" id="temperature" placeholder="Enter the Temperature of the surrounding in Celsius" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="phase">phase voltage</Label>
                    <Input type="float" name="phase" id="phase" placeholder="Enter the Phase voltage in KV of the transmission system:" onChange={handleChange} />
                </FormGroup>
                <Button>Submit</Button>
                <hr /><br />
            </Form><br />
            <div className="container">
                {!isSubmit ? (null) : (<><h2>Corona power loss is : {Pc} kW/km/phase</h2><h2>Visual critical voltage is : {criticalVoltage}} kW/km/phase</h2>
                    <Button onClick={handleReset}>Again</Button>
                </>)}
            </div>
            <br />
            <br />
            <br />
        </div>
    )
}

export default Corona
