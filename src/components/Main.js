import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function Main() {
    const [initialValues, setInitialValues] = useState({ length: 0, pressure: 0, conductor: "" });
    const [isSubmit, setIsSubmit] = useState(false);
    const [Sag, setSag] = useState(0);
    const handleSubmit = (e) => {
        setIsSubmit(!isSubmit);
        e.preventDefault();
        console.log(initialValues);
        const Findwt = () =>{
        if (initialValues.conductor === 'MARTIN') {
            const w = 1.604;
            const t = 2902.5;
            return [w, t]

        } if (initialValues.conductor === 'RAIL') {
            const w = 2.588;
            const t = 5152.2;
            return [w, t]


        } if (initialValues.conductor === 'PHEASANT') {
            const w = 2.137;
            const t = 4852.5;
            return [w, t]
        }
        if (initialValues.conductor === 'OTHER') {
            const w = 0;
            const t = 0;
            return [w, t]
        }
    };
        const [w, t] = Findwt() ;
        const a = 8.3 ;
        //Total weight
        const Wt = Math.sqrt(w*w+ initialValues.pressure*initialValues.pressure );

        const sag = (Wt*0.5)/(8*t) ;

        const x = initialValues.pressure/w ;

        const theta = a*Math.tan(x) ;

        //vertical sag
        const Vsag = sag*Math.sin(theta);

        // alert(Vsag, 'vsag');
        setSag(Vsag);
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
                    <Input type="number" name="length" id="length" placeholder="in meters" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="pressure">Magnitude of Wind pressure</Label>
                    <Input type="number" name="pressure" id="pressure" placeholder="in Kg/m" onChange={handleChange} />
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
                <Button>Submit</Button>
            </Form>
            <br />
            <div className="container">
                {!isSubmit ? (null) : (<h2>Calculated Vertical Sag is : {Sag}</h2>)}
            </div>
        </div>
    )
}

export default Main
