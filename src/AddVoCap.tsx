import { useEffect, useState } from "react"
import Layout from "./components/Layout"
import localforage from "localforage"
import { useLocation, useNavigate } from "react-router-dom"
const AddVoCap = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [inputWord, setInputWord] = useState("")
  const [inputMeaning, setInputMeaning] = useState("")
  const params = new URLSearchParams(location.search)
  const word = params.get("word")

  const handleSave = async () => {
    const vocab = {
      word: inputWord,
      meaning: inputMeaning,
      createdDate: new Date(),
    }
    const getExistingVocab = async () => {
      const existingVocab = (await localforage.getItem("vocab")) as {
        word: string
        meaning: string
        createdDate: Date
      }[]
      return existingVocab || [] // If there is no existing vocab, return an empty array
    }

    const existingVocab = await getExistingVocab()
    // check if the vocab already exists in the array
    const existingVocabIndex = existingVocab.findIndex(
      (item) => item.word.toLowerCase() === vocab.word.toLowerCase()
    )

    // update flow
    if (word) {
      existingVocab[existingVocabIndex] = vocab
      localforage.setItem("vocab", existingVocab, function () {
        navigate("/")
      })
      return
    } else {
      if (existingVocabIndex !== -1) {
        alert("Vocab already exists")
        return
      }
      const combinedVocab = [...existingVocab, vocab] // Append the new vocab to the existing array

      localforage.setItem("vocab", combinedVocab, function () {
        // if err is non-null, we got an error
        navigate("/")
      })
    }
  }

  useEffect(() => {
    if (word) {
      const getVocab = localforage.getItem("vocab")

      getVocab.then((vocab) => {
        const vocabArray = vocab as { word: string; meaning: string }[]
        const existingWord = vocabArray.find((item) => item.word === word)
        if (existingWord) {
          setInputWord(existingWord.word)
          setInputMeaning(existingWord.meaning)
        }
      })
    }
  }, [word])
  return (
    <Layout>
      <div className="flex flex-col items-center m-auto gap-4 justify-center bg-white h-[300px]  rounded-2xl p-4 lg:w-[700px]">
        <input
          autoFocus
          className="text-2xl px-6 py-2 rounded-full w-full border-[2px] border-gray-400 outline-none focus:border-teal-600"
          placeholder="Input Word"
          onChange={(e) => setInputWord(e.target.value)}
          value={inputWord}
        />
        <input
          className="text-2xl px-6 py-2 rounded-full w-full border-[2px] border-gray-400 outline-none focus:border-teal-600"
          placeholder="Input Meaning"
          onChange={(e) => setInputMeaning(e.target.value)}
          value={inputMeaning}
        />
        <button
          type="button"
          onClick={handleSave}
          disabled={!inputWord || !inputMeaning}
          className="bg-blue-500 disabled:bg-gray-400 text-white px-6 py-2 rounded-full w-full font-bold h-11 border-[2px] border-white"
        >
          SAVE
        </button>
      </div>
    </Layout>
  )
}

export default AddVoCap
