import { NextPage } from 'next'

interface Props {}

const Footer: NextPage<Props> = () => {
    return (
        <div className='flex justify-center gap-1'>
        Create by <a className='text-blue-500' href="http://teerut.me/">Teerut</a>
        </div>
    )
}

export default Footer