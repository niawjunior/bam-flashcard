import { useState } from "react"
import "./App.css"
import Layout from "./components/Layout"
import localforage from "localforage"
import FlashcardContainer from "./components/FlashCard"
function App() {
  const [words, setWords] = useState<{ word: string; meaning: string }[]>([])
  localforage.getItem("vocab", function (_, value) {
    const vocabs = value as { word: string; meaning: string }[]

    setWords(vocabs)
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
    console.log(wordToEdit)
  }

  return (
    <>
      <Layout>
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
