import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function Main() {
    const [initialValues, setInitialValues] = useState({ length: 0, pressure: 0, conductor: "", weight: 0 , tension: 0 });
    const [isSubmit, setIsSubmit] = useState(false);
    const [Sag, setSag] = useState(0);
    const [VSag, setVSag] = useState(0);
    const [totalWeight, settotalWeight] = useState(0);
    const handleReset = () => {
        setIsSubmit(false);
        setInitialValues({ length: 0, pressure: 0, conductor: "", weight: 0 , tension: 0 })
    }
    // const handleDisable = () =>
    const handleSubmit = (e) => {
        setIsSubmit(!isSubmit);
        e.preventDefault();
        console.log(initialValues);
        const Findwt = () => {
            if (initialValues.conductor === 'RAIL') {
                const w = 1.604;
                const t = 2902.5;
                return [w, t]

            } if (initialValues.conductor === 'MARTIN') {
                const w = 2.588;
                const t = 5152.2;
                return [w, t]


            } if (initialValues.conductor === 'PHEASANT') {
                const w = 2.137;
                const t = 4852.5;
                return [w, t]
            }
            if (initialValues.conductor === 'OTHER') {
                const w = initialValues.weight
                const t = initialValues.tension
                return [w, t]
            }
        };
        const [w, t] = Findwt();
        console.log(w, t, 'w & t');
        const a = 8.3;
        //Total weight
        const Wt = Math.sqrt((w * w) + (initialValues.pressure * initialValues.pressure))
        console.log(Wt, 'total weight');
        settotalWeight(Wt);
        const sag = (Wt * initialValues.length  *initialValues.length) / (8 * t);
        console.log(sag, 'sag');
        setSag(sag);
        const x = initialValues.pressure / w;

        const theta = a * Math.tan(x);
        console.log(theta, 'theta');
        //vertical sag
        const Vsag = sag * Math.cos(theta);

        // alert(Vsag, 'vsag');
        setVSag(Vsag);
    };

    const handleChange = (e) => {
        setInitialValues({ ...initialValues, [e.target.name]: e.target.value });
        console.log('cahnging')
    }

    return (
        <div className="container">
            <h2>Calculate Sag</h2>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <FormGroup>
                    <Label for="length">Length of span</Label>
                    <Input type="float" name="length" id="length" placeholder="in meters" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="pressure">Magnitude of Wind pressure</Label>
                    <Input type="float" name="pressure" id="pressure" placeholder="in Kg/m" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="conductor">Type of conductor</Label>
                    <Input type="select" name="conductor" id="conductor" onChange={handleChange}>
                        <option value=""></option>
                        <option value="RAIL">RAIL</option>
                        <option value="MARTIN">MARTIN</option>
                        <option value="PHEASANT">PHEASANT</option>
                        <option value="OTHER">OTHER</option>
                    </Input>
                </FormGroup>
                {
                    initialValues.conductor === 'OTHER' ? (
                        <>
                            <FormGroup>
                                <Label for="weight">Weight of the conductor</Label>
                                <Input type="float" name="weight" id="weight" placeholder="in Kg/m" onChange={handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="tension">Tension in the conductor</Label>
                                <Input type="float" name="tension" id="tension" placeholder="in Kg/m" onChange={handleChange} />
                            </FormGroup>
                        </>
                    ) : (null)
                }
                <Button>Submit</Button>
                <hr /><br />
            </Form>
            <br />
            <div className="container">
                {!isSubmit ? (null) : (<>
                    <h2>Calculated total Weight is : {totalWeight} Kg</h2>
                    <h2>Calculated sag is : {Sag} Kg</h2>
                <h2>Calculated Vertical Sag is : {VSag} meters</h2>
                    <Button onClick={handleReset}>Again</Button>
                </>)}
            </div>
            <br />
            <br />
            <br />
        </div>
    )
}

export default Main
