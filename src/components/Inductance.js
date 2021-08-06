import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function Inductance() {
    const [isSubmit, setIsSubmit] = useState(false);
    const [inductance, setInductance] = useState(0);
    const [initialValues, setInitialValues] = useState({
        circuit: "", conductor: "", noOfBunS: 0, distanceS: 0, phaseAB: 0, phaseBC: 0,
        phaseAC: 0, radius: 0, bundledS: "", bundledD: "", VerDisAB: 0, VerDisBC: 0, VerDisAC: 0,
        distAC: 0, distBB: 0, distCA: 0, noOfBunD: 0, distanceD: 0
    });
    var nthRoot = function (n, root) {
        return Math.pow(n, 1 / root);
    };

    // console.log(nthRoot(64, 4)) //2.82842712474619
    const handleReset = () => {
        setInitialValues({
            circuit: "", conductor: "", noOfBunS: 0, distanceS: 0, phaseAB: 0, phaseBC: 0,
            phaseAC: 0, radius: 0, bundledS: "", bundledD: "", VerDisAB: 0, VerDisBC: 0, VerDisAC: 0,
            distAC: 0, distBB: 0, distCA: 0, noOfBunD: 0, distanceD: 0
        });

        setIsSubmit(false);
    }
    const handleSubmit = (e) => {
        const { circuit, conductor, noOfBunD, noOfBunS, phaseAB, phaseAC, phaseBC, radius, bundledD,
            bundledS, distAC, distBB, distCA, distanceD, distanceS, VerDisAB, VerDisAC, VerDisBC } = initialValues;
        setIsSubmit(true);
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
                r = radius;
                break;
            default:
                break;
        };
        r = r * 0.7788;
        console.log(r, 'r_')
        if (circuit === 'S') {
            if (bundledS === 'Y') {
                console.log('S and Y')
                let Ds;
                console.log(noOfBunS, 'no of bundled on S');
                switch (noOfBunS) {
                    case '2':
                        console.log('2')
                        let a = r * distanceS;
                        console.log(a, 'a');
                        let b = Math.pow(a, 2);
                        console.log(b, 'b');
                        Ds = nthRoot(b, 4);
                        console.log(Ds, 'Ds');
                        break;
                    case '3': Ds = nthRoot(r * Math.pow(distanceS, 2), 3); break;
                    case '4': Ds = nthRoot(4 * (r * Math.pow(distanceS, 3)), 16); break;
                    default:
                        console.log('default Ds');
                        Ds = r
                };
                console.log(Ds, 'Ds')
                const Deq = nthRoot(phaseAB * phaseBC * phaseAC, 3);
                console.log(Deq, 'Deq')
                const L = (2E-7) * Math.log(Deq / Ds);
                setInductance(L);
            }
            else { setInductance("calculation not possible") }


        };

        if (circuit === 'D') {
            if (bundledD === 'Y') {
                let Dsa;

                switch (noOfBunD) {
                    case '2': Dsa = Math.sqrt(Math.pow(r, 2)); break;
                    case '3': Dsa = nthRoot(r * (Math.pow(distanceD, 2)), 3); break;
                    case '4': Dsa = 1.09 * nthRoot(r * (Math.pow(distanceD, 3)), 4); break;
                    default:
                        Dsa = 1;
                        break;
                };
                console.log(noOfBunD, 'Y', 'nofofBunD', Dsa, 'Dsa');
                const Dsa1 = Math.sqrt(Dsa * Math.sqrt((Math.pow(VerDisAC, 2) + Math.pow(distAC, 2))))
                console.log(Dsa1, 'Dsa1')
                const Dsa3 = Dsa1;
                const Dsa2 = Math.sqrt(Dsa * distBB);
                console.log(Dsa2, 'Dsa2')
                const Ds = nthRoot(Dsa1 * Dsa2 * Dsa3, 3);
                console.log(Ds, 'Ds');
                let cpe = Math.pow(VerDisAB, 2);
                console.log(VerDisAB, VerDisAC, VerDisBC, 'verdisab');
                let d = Math.pow(distAC, 2);
                console.log(cpe, d, 'cd')
                const dab = nthRoot(((cpe) * (Math.sqrt(d + cpe))), 4);
                console.log(dab, 'dab');
                const dbc = nthRoot((VerDisBC ** 2) * (Math.sqrt((distBB ** 2) + (VerDisBC ** 2)) ** 2), 4);
                console.log(dbc, 'dbc');
                const dac = nthRoot((VerDisAC ** 2) * (Math.sqrt((distCA ** 2) + (VerDisAC ** 2)) ** 2), 4);
                console.log(dac, 'dca');
                const Dm = nthRoot(dab * dbc * dac, 3);
                console.log(Dm, 'Dm');
                const L = (2E-7) * Math.log(Dm / Ds);
                setInductance(L);


            }
            else {
                if (distAC === distBB && distBB === distCA) {
                    console.log('distAC === distBB && distBB === distCA')
                    let Dsa = Math.sqrt(r * Math.sqrt(Math.pow(VerDisAC, 2) + Math.pow(VerDisAC, 2)));
                    const Dsc = Dsa;
                    const Dsb = Math.sqrt(r * distBB);
                    const Ds = nthRoot(Dsa * Dsc * Dsb, 3);
                    const dab = Math.sqrt(VerDisAB * Math.sqrt(Math.pow(VerDisAB, 2) + Math.pow(distBB, 2)))
                    const dbc = dab;
                    const dac = Math.sqrt(VerDisAC * distCA);
                    const Dm = nthRoot(dab * dbc * dac, 3);
                    console.log(Dm, 'Dm');
                    let L = (2E-7) * Math.log(Dm / Ds);
                    setInductance(L);
                }
                else {
                    console.log('not equat adj');
                    const t = distCA - distAC;
                    const u = t / 2;
                    const v = distCA - u;
                    const h = Math.sqrt((v ** 2) + (VerDisAC ** 2));
                    const Dsb = Math.sqrt(r * distBB);
                    const Dsa = Math.sqrt(r * h);
                    const Dsc = Dsa;
                    const Ds = nthRoot(Dsa * Dsb * Dsc, 3);
                    const a = distBB - distAC;
                    const b = distBB - (a / 2)
                    const m = distBB - distCA
                    const n = m / 2;

                    let hcb = Math.sqrt((VerDisBC ** 2) + (n ** 2));
                    let hcb_ = Math.sqrt((VerDisBC ** 2) + Math.pow(distBB - n, 2));
                    let hab = Math.sqrt((VerDisAB ** 2) + Math.pow(a * 0.5, 2))
                    let hab_ = Math.sqrt((VerDisAB ** 2) + b ** 2)

                    const hc_b = hab_;
                    const hc_b_ = hab;
                    const ha_b = hcb_;
                    const ha_b_ = hcb;

                    const dab = nthRoot(hab * hab_ * ha_b * ha_b_, 4);
                    const hac = Math.sqrt((u ** 2) + VerDisAC ** 2);
                    const ha_c_ = hac;
                    const dac = nthRoot(distAC * hac * distCA * ha_c_, 4);
                    const dbc = nthRoot(hcb * hcb_ * hc_b * hc_b_, 4);
                    const Dm = nthRoot(dac * dbc * dab, 3)
                    console.log(Dm, 'Dm');
                    const L = (2E-7) * Math.log(Dm / Ds);
                    setInductance(L);
                }
            }
        }
    };

    const handleChange = (e) => {
        setInitialValues({ ...initialValues, [e.target.name]: e.target.value });
        console.log('cahnging', e.target.name)
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
                            <Input type="float" name="radius" id="radius" placeholder="in meters" onChange={handleChange} />
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
                                    <Label for="noOfBunS">Number of Bundles</Label>
                                    <Input type="float" name="noOfBunS" id="noOfBunS" placeholder="e.g 3" onChange={handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="distanceS">Distance b/w the bundled conductors</Label>
                                    <Input type="float" name="distanceS" id="distanceS" placeholder="in meters" onChange={handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="phaseAB">Enter distance b/w Phase A and B</Label>
                                    <Input type="float" name="phaseAB" id="phaseAB" placeholder="in meters" onChange={handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="phaseBC">Enter distance b/w Phase B and C</Label>
                                    <Input type="float" name="phaseBC" id="phaseBC" placeholder="in meters" onChange={handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="phaseAC">Enter distance b/w Phase A and C</Label>
                                    <Input type="float" name="phaseAC" id="phaseAC" placeholder="in meters" onChange={handleChange} />
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
                            <Label for="VerDisAB">Enter vertical distance b/w Phase A and B</Label>
                            <Input type="float" name="VerDisAB" id="VerDisAB" placeholder="in meters" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="VerDisBC">Enter vertical distance b/w Phase B and C</Label>
                            <Input type="float" name="VerDisBC" id="VerDisBC" placeholder="in meters" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="VerDisAC">Enter vertical distance b/w Phase A and C</Label>
                            <Input type="float" name="VerDisAC" id="VerDisAC" placeholder="in meters" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="distAC">Enter distance b/w phase A and adjacent conductor C-</Label>
                            <Input type="float" name="distAC" id="distAC" placeholder="in meters" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="distBB">Enter distance b/w phase B and adjacent conductor B-</Label>
                            <Input type="float" name="distBB" id="distBB" placeholder="in meters" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="distCA">Enter distance b/w phase C and adjacent conductor A-</Label>
                            <Input type="float" name="distCA" id="distCA" placeholder="in meters" onChange={handleChange} />
                        </FormGroup>
                        {initialValues.bundledD === 'Y' ? (
                            <>
                                <FormGroup>
                                    <Label for="noOfBunD">Enter float of bundled conductors</Label>
                                    <Input type="float" name="noOfBunD" id="noOfBunD" placeholder="e.g: 3" onChange={handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="distanceD">Enter spacing b/w the bundled conductors:</Label>
                                    <Input type="float" name="distanceD" id="distanceD" placeholder="in meters" onChange={handleChange} />
                                </FormGroup>
                            </>
                        ) : (null)}
                    </>
                )}
                <Button>Submit</Button>
                <hr /><br />

            </Form>
            <div className="container">
                {!isSubmit ? (null) : (<><h2>Inductance Per Phase of Transmission Line : {inductance} H/m/phase</h2>
                    <Button onClick={handleReset}>Again</Button></>)}

            </div>
            <br />
            <br />
            <br />
        </div>
    )
}
export default Inductance;