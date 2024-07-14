import { useState } from "react"
import Layout from "./components/Layout"
import localforage from "localforage"
import { useNavigate } from "react-router-dom"
const AddVoCap = () => {
  const [inputWord, setInputWord] = useState("")
  const [inputMeaning, setInputMeaning] = useState("")
  const navigate = useNavigate()

  const handleSave = async () => {
    console.log(inputWord, inputMeaning)
    const vocab = {
      word: inputWord,
      meaning: inputMeaning,
    }
    const getExistingVocab = async () => {
      const existingVocab = (await localforage.getItem("vocab")) as {
        word: string
        meaning: string
      }[]
      return existingVocab || [] // If there is no existing vocab, return an empty array
    }

    const existingVocab = await getExistingVocab()
    // check if the vocab already exists in the array
    const existingVocabIndex = existingVocab.findIndex(
      (item) => item.word.toLowerCase() === vocab.word.toLowerCase()
    )

    if (existingVocabIndex !== -1) {
      alert("Vocab already exists")
      return
    }
    const combinedVocab = [...existingVocab, vocab] // Append the new vocab to the existing array

    console.log(combinedVocab)
    localforage.setItem("vocab", combinedVocab, function (err) {
      // if err is non-null, we got an error
      console.log(err)
      navigate("/")
    })
  }

  return (
    <Layout>
      <div className="flex flex-col items-center gap-4 justify-center ">
        <input
          className="text-2xl px-6 py-2 rounded-full w-full outline-none focus:outline-teal-600"
          placeholder="Input Word"
          onChange={(e) => setInputWord(e.target.value)}
        />
        <input
          className="text-2xl px-6 py-2 rounded-full  w-full outline-none focus:outline-teal-600"
          placeholder="Input Meaning"
          onChange={(e) => setInputMeaning(e.target.value)}
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
