import { useState } from "react"
import { CiCircleRemove } from "react-icons/ci"
import { FiEdit2 } from "react-icons/fi"

const Flashcard = ({
  word,
  meaning,
  handleRemove,
  handleEdit,
}: {
  word: string
  meaning: string
  handleRemove: (word: string) => void
  handleEdit: (word: string) => void
}) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div className="perspective w-full h-[100px]" onClick={handleFlip}>
      <div className={`flashcard ${isFlipped ? "flipped" : ""}`}>
        <div className="front bg-white h-[100px] w-full rounded-2xl p-4 flex justify-center items-center text-3xl text-red-200 cursor-pointer">
          {word}
        </div>
        <div className="back bg-white h-[100px] w-full rounded-2xl p-4 flex justify-center items-center text-3xl text-green-400 cursor-pointer">
          {meaning}
        </div>
        {!isFlipped && (
          <div className="flex">
            <CiCircleRemove
              onClick={(e) => {
                e.stopPropagation() // Prevent the flip when clicking the remove button
                handleRemove(word)
              }}
              className="absolute top-2 right-2 text-red-300"
            />
            <FiEdit2
              onClick={(e) => {
                e.stopPropagation() // Prevent the flip when clicking the remove button
                handleEdit(word)
              }}
              className="absolute bottom-2 right-2 text-yellow-300"
            />
          </div>
        )}
      </div>
    </div>
  )
}

const FlashcardContainer = ({
  words,
  handleRemove,
  handleEdit,
}: {
  words: { word: string; meaning: string }[]
  handleRemove: (word: string) => void
  handleEdit: (word: string) => void
}) => {
  return (
    <div className="flex justify-center flex-col items-center gap-4">
      {words?.map((item, index) => (
        <Flashcard
          key={index}
          word={item.word}
          meaning={item.meaning}
          handleRemove={handleRemove}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  )
}

export default FlashcardContainer
