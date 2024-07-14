import { useState } from "react"
import "./App.css"
import Layout from "./components/Layout"
import localforage from "localforage"
import FlashcardContainer from "./components/FlashCard"
import { createSearchParams, useNavigate } from "react-router-dom"
function App() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [words, setWords] = useState<
    { word: string; meaning: string; createdDate: Date }[]
  >([])
  localforage.getItem("vocab", function (_, value) {
    const vocabs = value as {
      word: string
      meaning: string
      createdDate: Date
    }[]

    setWords(vocabs)
    setIsLoading(false)
    // if err is non-null, we got an error. otherwise, value is the value
  })

  const handleRemove = (wordToRemove: string) => {
    const findIndex = words.findIndex((word) => word.word === wordToRemove)
    if (findIndex === -1) return

    const newWords = [...words]
    newWords.splice(findIndex, 1)
    setWords(newWords)

    localforage.setItem("vocab", newWords, function (err) {
      // if err is non-null, we got an error
      console.log(err)
    })
  }

  const handleEdit = (wordToEdit: string) => {
    navigate({
      pathname: "/add",
      search: createSearchParams({ word: wordToEdit }).toString(),
    })
  }

  return (
    <>
      <Layout>
        {words?.length === 0 && !isLoading && (
          <div className="flex flex-col justify-center items-center h-[70vh]">
            <div className="text-3xl font-bold text-orange-600">
              Vocabulary not found
            </div>
            <div className="text-lg font-semibold text-orange-400">
              Please add new vocabulary
            </div>
          </div>
        )}

        <FlashcardContainer
          handleRemove={handleRemove}
          words={words}
          handleEdit={handleEdit}
        />
      </Layout>
    </>
  )
}

export default App
