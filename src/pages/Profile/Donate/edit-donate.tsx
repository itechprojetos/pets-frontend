import React, { useState, useEffect } from 'react'
import FooterBanner from '../../../components/FooterBanner'
import { Container } from 'react-bootstrap'
import { Row, Col, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import './styles.scss'
import Select, { SelectOption } from '../../../components/Select'
import history from '../../../routes/history'
import InputFile from '../../../components/InputFile'
import { useParams } from 'react-router';
import useDonate from './useDonate'
import api from '../../../services/api'
import { toast } from 'react-toastify';

interface Props {
    userSigned: boolean
    donationSuccess: boolean
    donationErrorMessage: string
    donate: (data: any) => void
    donateSetError: (message: string) => void
    donateClear: () => void
}

const EditDonate: React.FC<{}> = () => {

    const [castration, setCastration] = useState('Castrado')
    const [name, setName] = useState('')
    const [gender, setGender] = useState('Macho')
    const [age, setAge] = useState('')
    const [vaccines, setVaccines] = useState('')
    //const [urlImage, setUrlImage] = useState('')
    // const [temper, setTemper] = useState('')
    // const [vermifuge, setVermifuge] = useState('')

    const [imageDescription, setImageDescription] = useState('')
    const [file, setFile] = useState<File | undefined>(undefined)

    // const notSignedError = !userSigned ? 'Você precisa estar logado para acessar essa funcionalidade.' : undefined

    const onImageChosen = (file: File, dataBase64: string) => {
        // setImage(dataBase64)
        setImageDescription(file.name)
        setFile(file)
    }

    const params = useParams<{ id?: string }>()

    const { /*loading*/ data, /*errored*/ } = useDonate(params.id);

    useEffect(() => {
        setName(data?.donation.name)
        setGender(data?.donation.gender)
        setAge(data?.donation.age)
        setVaccines(data?.donation.vaccines)
    }, [data])

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const data = {
            donation: {
                name,
                gender,
                age,
                castration,
                vaccines,
                id: params?.id
            },
            file
        }

        // console.log('submit', data)

        const response = await api.post('/services/app/Donations/CreateOrEdit', data)
        // console.log(response)
        if (response.data.success) {
            toast.success('Dados atualizados com sucesso!');
        } else {
            toast.error('Falha ao atualizar os dados!');
        }
        history.push('/profile');

    }

    return (
        <Container className="donate-content">
            <div className="donate-content-title" style={{ marginLeft: '15px' }}>
                Editar dados <span>para DOAÇÃO de Pet!</span>
            </div>

            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={12}>
                        <label className="small font-weight-bold">Fale um pouco sobre o Pet</label>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <FormLabel>Nome</FormLabel>
                            <FormControl
                                placeholder="Nome"
                                type="text"
                                value={name}
                                onChange={(e: any) => setName(e.target.value)}
                                required
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <FormLabel>Gênero</FormLabel>
                            <Select value={gender} className="">
                                <SelectOption onSelected={value => setGender(value)}>Macho</SelectOption>
                                <SelectOption onSelected={value => setGender(value)}>Fêmea</SelectOption>
                            </Select>
                        </FormGroup>
                    </Col>
                </Row>
                <Col md={6}>
                    <FormGroup>
                        <FormLabel>Idade</FormLabel>
                        <FormControl
                            placeholder="Idade"
                            type="text"
                            value={age}
                            onChange={(e: any) => setAge(e.target.value)}
                        />
                    </FormGroup>
                </Col>
                <div className="flexDiv">
                    <Col md={6}>
                        <FormGroup>
                            <FormLabel>Castrado</FormLabel>
                            <Select value={castration} className="">
                                <SelectOption onSelected={value => setCastration(value)}>Castrado</SelectOption>
                                <SelectOption onSelected={value => setCastration(value)}>Não Castrado</SelectOption>
                            </Select>
                            {/* <FormControl
                                as="select"
                                type="select"
                                value={castration}
                                onChange={(e : any) => setCastration(e.target.value)}
                                required
                            >
                                <option value="">Selecione...</option>
                                <option>Castrado</option>
                                <option>Não Castrado</option>
                            </FormControl> */}
                        </FormGroup>
                    </Col>
                </div>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <FormLabel>Vacinas</FormLabel>
                            <FormControl
                                placeholder="Vacinas"
                                type="text"
                                value={vaccines}
                                onChange={(e: any) => setVaccines(e.target.value)}
                                required
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="form-group row">
                            <InputFile
                                className="col-md-6"
                                placeholder="Adicionar foto"
                                value={imageDescription}
                                onFileChosen={onImageChosen} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <button className="btn btn-primary" type="submit">Atualizar</button>
                    </Col>
                </Row>
            </Form>
            <FooterBanner />
        </Container>
    )
}


export default EditDonate;
