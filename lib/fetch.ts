"use client"

import axios from "axios"
import { useState } from "react"

interface Data {
    key: string
    title: string
    subtitle: string
    first_sentence: string
    author_name: string[]
    number_of_pages_median: number
    isbn: string
    first_publish_year: number
    cover_i: string
    ratings_average: number
    description: string[] | { value: string } | any
}

export const useSearch = () => {
    const [ data, setData ] = useState<Data | null>(null)
    const [ extra, setExtra ] = useState<Data | null>(null)
    const fetch = async (search: string) => {
        try {
            const response = await axios.get(`https://openlibrary.org/search.json?title=${search}`)
            const key = response.data?.docs[0].key
            if(key) {
                const extra = await axios.get(`https://openlibrary.org${key}.json`)
                setExtra(extra.data)
            }
            setData(response.data?.docs[0])
        } catch(err) {
            console.log("Error fetching the searched book's data" + err)
        }
    }
    return { fetch, data, extra }
}