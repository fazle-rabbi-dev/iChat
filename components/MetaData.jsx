import React from 'react'

function MetaData() {
  return (
    <>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="iChat is a Realtime Chat App built with Next.js and Firebase for seamless communication." />
        <meta name="keywords" content="Next.js, Firebase, Realtime, Chat, App, Communication, iChat, ichat, fh-rabbi ichat, iChat fhrabbi, fhrabbi ichat, fh-rabbi github" />
        <meta name="author" content="Fazle Rabbi" />
        
        {/*Open Graph Metadata*/}
        <meta property="og:title" content="iChat - Next.js Firebase Realtime Chat App" />
        <meta property="og:description" content="Realtime Chat App built with Next.js and Firebase for seamless communication." />
        <meta property="og:image" content="https://ichat-1343.netlify.app/chat1.svg" />
        <meta property="og:url" content="https://ichat-1343.netlify.app" />
    
        {/*Twitter Card Metadata*/}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="iChat - Next.js Firebase Realtime Chat App" />
        <meta name="twitter:description" content="Realtime Chat App built with Next.js and Firebase for seamless communication." />
        <meta name="twitter:image" content="https://ichat-1343.netlify.app/chat1.svg" />
    
        {/*Favicon*/}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    
        <title>iChat - Next.js Firebase Realtime Chat App</title>
    </>
  )
}

export default MetaData
