import { useState } from "react"
import { CiCircleRemove } from "react-icons/ci"
import { FiEdit2 } from "react-icons/fi"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo("en-US")

const Flashcard = ({
  word,
  meaning,
  createdDate,
  handleRemove,
  handleEdit,
}: {
  word: string
  meaning: string
  createdDate: Date
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
          <>
            <div className="text-xs absolute z-10 p-2 text-gray-400">
              {createdDate.toLocaleDateString()}
              {" | "}
              {timeAgo.format(new Date(createdDate))}
            </div>
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
          </>
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
  words: { word: string; meaning: string; createdDate: Date }[]
  handleRemove: (word: string) => void
  handleEdit: (word: string) => void
}) => {
  return (
    <div className="flex justify-center flex-col items-center gap-4 lg:w-[700px] m-auto">
      {words?.map((item, index) => (
        <Flashcard
          key={index}
          word={item.word}
          meaning={item.meaning}
          createdDate={item.createdDate}
          handleRemove={handleRemove}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  )
}

export default FlashcardContainer
