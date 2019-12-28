import React, { useState } from 'react'
import styles from './Bookmark.module.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { MdAdd } from 'react-icons/md'
import isUrl from 'is-url'
import InputGroup from 'react-bootstrap/InputGroup'

function Bookmark({ id, widget, updateWidgetData, dragMode }) {
    const [show, setShow] = useState(false)
    const [url, setURL] = useState('')
    const [urlIcon, setUrlIcon] = useState('')
    const [message, setMessage] = useState('')
    const [customizeIcon, setCustomizeIcon] = useState(false)
    const [isCircle, setIsCircle] = useState(false)
    const [check, setCheck] = useState(false)

    const openLink = () => {
        if (id !== undefined) {
            if (widget === undefined) {
                setShow(true)
            }
            else {
                window.open(widget.link, '_blank')
            }
        }
    }

    const validateURL = e => {
        e.preventDefault()
        if (isUrl(url)) {
            setUrlIcon(url + 'favicon.ico')
            updateWidgetData(id, {link: url, icon: url + 'favicon.ico', circular: false})
            setMessage('Valid URL! Your bookmark is set.')
            setCustomizeIcon(!customizeIcon)
        }
        else {
            setMessage('Invalid URL! Please enter a valid URL.')
        }
    }

    const closeModal = () => {
        setShow(false)
        setURL('')
        setMessage('')
    }

    const saveShape = circle => {
        setIsCircle(circle)
        updateWidgetData(id, {link: url, icon: urlIcon, circular: circle})
    }

    const saveURLIcon = icon => {
        if (isUrl(icon)) {
            setUrlIcon(icon)
            updateWidgetData(id, {link: url, icon: icon, circular: isCircle})
        }
    }

    return (
        <>
            <div className={styles.Bookmark}>
                {widget === undefined ? 
                <Button variant="link" onClick={openLink} disabled={dragMode} >
                    <MdAdd />
                </Button> :
                <Button variant="link" onClick={openLink} disabled={dragMode}>
                    <img 
                        className={widget.circular ? styles.Circle : undefined} 
                        src={widget.icon} 
                        alt={widget.link} 
                    />
                </Button>}
            </div>
            <Modal
                show={show}
                onHide={closeModal}
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title>
                    Set up your bookmark
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={e => validateURL(e)}>
                        <Form.Group>
                            <Form.Label>Enter a URL</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={url} 
                                onChange={(e) => setURL(e.target.value)}
                            />
                            <Form.Text>{message}</Form.Text>
                        </Form.Group>
                    </Form>
                    <div className={!customizeIcon ? styles.IconCustomize : undefined}>
                        <h6>Icon Preview</h6>
                        <Form onSubmit={e => e.preventDefault()}>
                            <Container>
                                <Row>
                                    <Col sm={3}>
                                        <div className={styles.IconContainer}>
                                            <img 
                                                className={isCircle ? styles.Circle : undefined} 
                                                src={urlIcon} 
                                                alt={url} 
                                            />
                                        </div>
                                    </Col>
                                    <Col>
                                        <h6>Icon</h6>
                                        <Form.Check 
                                            onClick={() => setCheck(false)} 
                                            onChange={() => saveURLIcon(url + 'favicon.ico')} 
                                            type="radio" 
                                            label="favicon.ico" 
                                            name="iconType" 
                                            defaultChecked
                                        />
                                        <Form.Check
                                            onClick={() => setCheck(false)} 
                                            onChange={() => saveURLIcon(url + 'apple-touch-icon.png')} 
                                            type="radio" 
                                            label="apple-touch-icon.png" 
                                            name="iconType" 
                                        />
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <Form.Check 
                                                    onClick={() => setCheck(true)} 
                                                    type="radio" 
                                                    label="" 
                                                    name="iconType"
                                                    checked={check} 
                                                />
                                            </InputGroup.Prepend>
                                            <Form.Control 
                                                type="text" 
                                                size="sm" 
                                                onChange={e => saveURLIcon(e.target.value)} 
                                                onFocus={() => setCheck(true)}
                                                placeholder="Set your own icon with a URL"
                                            />
                                        </InputGroup>
                                        <br />
                                        <h6>Shape</h6>
                                        <Form.Check 
                                            onChange={() => saveShape(!isCircle)} 
                                            type="radio" 
                                            label="Square" 
                                            name="shape" 
                                            inline 
                                            defaultChecked
                                        />
                                        <Form.Check 
                                            onChange={() => saveShape(!isCircle)} 
                                            type="radio" 
                                            label="Circle" 
                                            name="shape" 
                                            inline
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Bookmark
