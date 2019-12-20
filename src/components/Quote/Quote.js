import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './Quote.module.css'

function Quote() {
    const [quote, setQuote] = useState('')
    const [author, setAuthor] = useState('')

    useEffect(() => {
        axios.get("https://type.fit/api/quotes").then(res => {
            const data = res.data[Math.floor(Math.random() * 1643)]
            setQuote(data.text)
            setAuthor(data.author)
        })
    }, [])

    return (
        <div className={styles.Quote}>
            <div>"{quote}"</div>
            {author !== null && <div style={{fontStyle: 'italic'}}>{author}</div>}
        </div>
    )
}

export default Quote
