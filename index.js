import express from 'express'
import rewrite from './rewrite.js'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  let textToSpin = `A stray dog was found carrying a newborn baby girl in a trash bag through the streets of Tripoli, in Lebanon on Wednesday, New York Post reported. The baby was left outside a municipal building in Lebanon.
  A passerby saw the dog carrying the bag after he heard a baby's cries, he managed to take the bag from the dog and found the infant inside. Arab News reported that the baby had bruises all over her body and was taken to the Islamic Charity Hospital, then transferred to the Tripoli Governmental Hospital after security services and judicial authorities were informed.
  
  The media outlet reported that the baby was only a few hours old. But there is no information on when she was abandoned. The doctors said that her condition was serious but stable.
  
  Ghassan Rifi, a journalist in Tripoli, said that she does not understand why the person abandoned the baby, she wrote on Twitter, "It was not known whether the 'wild lady' who threw the child and fled to an unknown destination had intended to throw her in the area so that the dogs would finish her off and eat her corpse or to draw attention to her."
  
  Listen to the latest songs, only on JioSaavn.com
  "But in all cases, the dog that dragged her was more humane in the face of the brutality and criminality of the one who threw her."
  Police are investigating the matter and searching for the baby's abandoners.`; 
  rewrite(res,textToSpin,"new");
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})