import React, { useState } from 'react'
import md5 from 'md5'
import { CustomerTypesIds } from '../../../shared'
import { Row, Col, Form, FormLabel, FormGroup, FormControl } from 'react-bootstrap'
import InputMask from 'react-input-mask'
import { toast } from 'react-toastify'
import api from '../../../services/api'
import history from '../../../routes/history';
import './styles.scss'


const ClientForm: React.FC<{}> = () => {

    // const [dados, setDados] = useState<any>([]);

    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const [email, setEmail] = useState('')
    const [confirmationEmail, setConfirmationEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmationPassword, setConfirmationPassword] = useState('')

    const handleSubmit = async (e: any) => {

        e.preventDefault();

        try {
            // const { name, cpf, email, confirmationEmail, password, confirmationPassword } = dados;

            if (email !== confirmationEmail) {
                toast.error('Os e-mails informados são diferentes!')
                return
            }

            if (password !== confirmationPassword) {
                toast.error('As senhas informadas são diferentes!')
                return
            }


            // set dados

            const pass = md5(password)
            const data = {
                name,
                email,
                password: pass,
                cpF_CNPJ: cpf.replace(/[.\-/]/g, ''),
                customerTypeId: CustomerTypesIds.client
            }

            const response = await api.post('/services/app/Customers/CreateOrEdit', data);

            if (response.data.success) {
                toast.success('Cadastrado realizado com sucesso!');
                history.push('/');
                return
            }


        } catch (err) {

            const { details } = err.response.data.error;

            if (details === 'Cpf/Cnpj already exists.') {
                toast.error('O CPF informado já está cadastrado.');
                history.push('/sign-up');
                return
            }

            if (details === 'E-mail already exists.') {
                toast.error('O e-mail informado já está cadastrado.');
                history.push('/sign-up');

            }
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <FormLabel>Nome</FormLabel>
                            <FormControl
                                name="name"
                                type="text"
                                placeholder="Nome Completo"
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <FormLabel>CPF</FormLabel>
                            <InputMask

                                className="form-control"
                                name="cpf"
                                type="text"
                                placeholder="CPF"
                                mask={'999.999.999-99'}
                                onChange={e => setCpf(e.target.value)}
                                required
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl
                                name="email"
                                type="email"
                                placeholder="Email"
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <FormLabel>Confirmar E-mail</FormLabel>
                            <FormControl
                                name="confirmationEmail"
                                type="email"
                                placeholder="Confirmar Email"
                                onChange={e => setConfirmationEmail(e.target.value)}
                                required
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <FormLabel>Senha</FormLabel>
                            <FormControl
                                name="password"
                                type="password"
                                placeholder="Senha"
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <FormLabel>Confirmar Senha</FormLabel>
                            <FormControl
                                name="confirmationPassword"
                                type="password"
                                placeholder="Confirmar Senha"
                                onChange={e => setConfirmationPassword(e.target.value)}
                                required
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <div>
                            <button className="btn btn-primary" type="submit" >Cadastrar</button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default ClientForm;
