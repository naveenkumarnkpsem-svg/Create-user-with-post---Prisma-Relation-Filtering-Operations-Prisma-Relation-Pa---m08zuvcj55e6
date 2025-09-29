const { prisma } = require("../db/config");

async function createUserWithPost({ name, email, title, content }) {


  if (!name || !email || !title || !content) {
    return { success: false }

  }

  try {

    await prisma.$transaction(async (tx)=>{

      const user = await tx.user.create({
        data:{
          name,
          email

        }
      })

      const post = await tx.post.create({
        data:{
          title,
          content,
          userId: user.id

        }
      })
      
    })


    return { success: true }



  }

  catch(err){
    
    return { success: false }
  }


}

module.exports = { createUserWithPost };
