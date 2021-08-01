import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function Inductance() {
    const [isSubmit, setIsSubmit] = useState(false);
    const [inductance, setInductance] = useState(0);
    const [initialValues, setInitialValues] = useState({
        circuit: "", conductor: "", noOfBunS: 0, distanceS: "", phaseAB: "", phaseBC: "",
        phaseAC: "", radius: "", bundledS: "", bundledD: "", VerDisAB: "", VerDisBC: "", VerDisAC: "", distAC: "", distBB: "", distCA: "", noOfBunD: "", distanceD: ""
    });

    const handleSubmit = (e) => {
        const { circuit, conductor, noOfBunD, noOfBunS, phaseAB, phaseAC, phaseBC, radius, bundledD, bundledS, distAC, distBB, distCA, distanceD, distanceS, VerDisAB, VerDisAC, VerDisBC } = initialValues;
        setIsSubmit(!isSubmit);
        e.preventDefault();
        let r;
        switch (conductor) {
            case 'RAIL':
                r = 1.591 / 100;
                break;
            case 'MARTIN':
                r = 1.8958 / 100;
                break;
            case 'PHEASANT':
                r = 1.824 / 100;
                break;
            case 'OTHER':
                r = initialValues.radius;
                break;
        };
        r = r * 0.7788;

        if (circuit === 'S') {
            if (bundledS === 'Y') {
                let Ds ;
                switch (noOfBunS) {
                    case '2': Ds = Math.nthroot((Math.poow(r*distanceS, 2)), 4)
                    case '3': Ds = Math.nthroot( r* Math.pow(distanceS, 2), 3)
                    case '4': Ds = Math.nthroot(4 * (r *Math.pow(distanceS, 3)), 16)
                    default : Ds = r 
                 };
                 const Deq= Math.nthroot(phaseAB*phaseBC*phaseAC, 3);
            const L = (2E-7) * Math.log(Deq/Ds);
            }
            else { setInductance("calculation not possible") }

            
        };

        if(circuit === 'D'){
            if(bundledD === 'Y'){


            }
            else{
                if(distAC == distBB && distBB == distCA){
                    let Dsa = Math.sqrt(r* Math.sqrt(Math.pow(VerDisAC, 2)+ Math.pow(VerDisAC, 2)));
                    const Dsc = Dsa ;
                    const Dsb = Math.sqrt(r * distBB);
                    const Ds = Math.nthroot(Dsa*Dsc*Dsb, 3);
                    const dab = Math.sqrt(VerDisAB* Math.sqrt(Math.pow(VerDisAB, 2)+Math.pow(distBB, 2)))
                    const dbc = dab ;
                    const dac = Math.sqrt(VerDisAC*distCA);
                    const Dm = Math.nthroot(dab*dbc*dac, 3);
                    let L = (2E-7)* Math.log(Dm/Ds);
                    setInductance(L);
                }
                else{
                    const t = distCA - distAC ;
                    const u = t /2 ;
                    const v = distCA - u ;
                    const h = Math.sqrt((v ** 2) + (VerDisAC ** 2));
                    const Dsb = Math.sqrt(r * distBB);
                    const Dsa= Math.sqrt(r* h);
                    const Dsc = Dsa;
                    const Ds = Math.nthroot(Dsa*Dsb*Dsc, 3);
                    const a = distBB - distAC;
                    const b = distBB - (a/2)
                    const m = distBB - distCA
                    const n = m/2 ;

                    // const hcb
                }
            }



        }








    };






    const handleChange = (e) => {
        setInitialValues({ ...initialValues, [e.target.name]: e.target.value });
        console.log('cahnging')
    };

    return (
        <div className="container">
            <h2>Calculate Inductance Per Phase of Transmission Line</h2>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <FormGroup>
                    <Label for="circuit">Type of circuit</Label>
                    <Input type="select" name="circuit" id="circuit" onChange={handleChange}>
                        <option value=""></option>
                        <option value="S">S</option>
                        <option value="D">D</option>
                    </Input>
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
                </FormGroup>{
                    initialValues.conductor === 'OTHER' ? (
                        <FormGroup>
                            <Label for="radius">Enter the radius in meters</Label>
                            <Input type="number" name="radius" id="radius" placeholder="in meters" onChange={handleChange} />
                        </FormGroup>
                    ) : (null)
                }

                {!initialValues.circuit ? (null) : (initialValues.circuit === 'S') ? (
                    <>
                        <FormGroup>
                            <Label for="bundledS">Is the Conductor Bundled ?</Label>
                            <Input type="select" name="bundledS" id="bundledS" onChange={handleChange}>
                                <option value=""></option>
                                <option value="Y">Y</option>
                                <option value="N">N</option>
                            </Input>
                        </FormGroup>
                        {initialValues.bundledS === 'Y' ? (
                            <>
                                <FormGroup>
                                    <Label for="bundles">Number of Bundles</Label>
                                    <Input type="number" name="bundles" id="bundles" placeholder="4" onChange={handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="distance">Distance b/w the bundled conductors</Label>
                                    <Input type="number" name="distance" id="distance" placeholder="" onChange={handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="phaseAB">Enter distance b/w Phase A and B</Label>
                                    <Input type="number" name="phaseAB" id="phaseAB" placeholder="" onChange={handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="phaseBC">Enter distance b/w Phase B and C</Label>
                                    <Input type="number" name="phaseBC" id="phaseBC" placeholder="" onChange={handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="phaseAC">Enter distance b/w Phase A and C</Label>
                                    <Input type="number" name="phaseAC" id="phaseAC" placeholder="" onChange={handleChange} />
                                </FormGroup>
                            </>
                        ) : (null)}
                    </>
                ) : (
                    <>
                        <FormGroup>
                            <Label for="bundledD">Is the Conductor Bundled ?</Label>
                            <Input type="select" name="bundledD" id="bundledD" onChange={handleChange}>
                                <option value=""></option>
                                <option value="Y">Y</option>
                                <option value="N">N</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="verDisAB">Enter vertical distance b/w Phase A and B</Label>
                            <Input type="number" name="verDisAB" id="verDisAB" placeholder="" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="verDisBC">Enter vertical distance b/w Phase B and C</Label>
                            <Input type="number" name="verDisBC" id="verDisBC" placeholder="" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="verDisAC">Enter vertical distance b/w Phase A and C</Label>
                            <Input type="number" name="verDisAC" id="verDisAC" placeholder="" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="distAC">Enter distance b/w phase A and adjacent conductor C-</Label>
                            <Input type="number" name="distAC" id="distAC" placeholder="" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="distBB">Enter distance b/w phase B and adjacent conductor B-</Label>
                            <Input type="number" name="distAC" id="distAC" placeholder="" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="distCA">Enter distance b/w phase C and adjacent conductor A-</Label>
                            <Input type="number" name="distAC" id="distAC" placeholder="" onChange={handleChange} />
                        </FormGroup>
                        {initialValues.bundledD === 'Y' ? (
                            <>
                                <FormGroup>
                                    <Label for="noOfBunCon">Enter Number of bundled conductors</Label>
                                    <Input type="number" name="noOfBunCon" id="noOfBunCon" placeholder="" onChange={handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="spaBunCon">Enter spacing b/w the bundled conductors:</Label>
                                    <Input type="number" name="spaBunCon" id="spaBunCon" placeholder="" onChange={handleChange} />
                                </FormGroup>
                            </>
                        ) : (null)}
                    </>
                )}
                <Button>Submit</Button>

            </Form>
            <div className="container">
                {!isSubmit ? (null) : (<h2>Inductance Per Phase of Transmission Line : {inductance}</h2>)}
            </div>
        </div>
    )
}
export default Inductance;