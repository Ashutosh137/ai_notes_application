import { FileSaveContext } from '../../../app/_context/FileSaveContext'
import { Button } from '../../../components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'

function WorkspaceHeader({fileName}) {
  const {fileSave,setFileSave}=useContext(FileSaveContext);
  return (
    <div className='px-4 h-16 flex justify-between items-center shadow-md'>
      <Link href={'/dashboard'}>
        <Image src={'/logo.svg'} alt='logo' width={50} height={30}/>
        </Link>
        <h2 className='font-bold'>{fileName}</h2>
        <div className='flex gap-2 items-center'>
          <Button onClick={()=>setFileSave(Date.now())}>Save</Button>
        <UserButton/>

        </div>
    </div>
  )
}

export default WorkspaceHeader