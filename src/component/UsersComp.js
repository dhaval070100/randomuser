import React, { useState, useEffect } from 'react'
import { useGetusersQuery } from '../services/User'
import { FaRegUser } from 'react-icons/fa'
import { BsCalendarDate } from 'react-icons/bs'
import { MdOutlineEmail, MdAddLocationAlt,MdAddCall ,MdLockOutline} from 'react-icons/md'
const UsersComp = () => {
    const [person, setPerson] = useState(null)
    const [value, setValue] = useState('')
    const [title, setTitle] = useState('I am')
    const defaultImg = "https://randomuser.me/api/portraits/men/75.jpg"
    const { data, isLoading, refetch } = useGetusersQuery()
    useEffect(() => {
        if (data) {

            const randomPerson = data.results[0];
            const { phone, email } = randomPerson
            const { large: image } = randomPerson.picture
            const { password } = randomPerson.login
            const { first, last } = randomPerson.name
            const { dob: { age } } = randomPerson
            const { street: { number, name } } = randomPerson.location
            const newPerson = { phone, email, image, password, age, street: `${number} ${name}`, name: `${first} ${last}` }
            setPerson(newPerson)
            setTitle("Name")
            setValue(newPerson.name)
        }
    }, [data])
const handleVlaue =(e)=>{
    if(e.target.classList.contains('icon')){
        const newValue = e.target.dataset.lable
        setTitle(newValue)  
        setValue(person[newValue]); 
    
    }

}
    return (
        <>
            <div className='container'>
                <div className='card-container'>
                    <div className='card-img'>
                        <img src={(person && person.image) || defaultImg} alt="defaultImg" />
                    </div>
                    <div className='card-button'>
                        <h5>
                            My {title} is
                        </h5>
                        <h1>{value}</h1>
                        <button className='icon' data-lable="name" onMouseOver={handleVlaue}>
                            <FaRegUser size={30} />
                        </button>
                        <button className='icon' data-lable="email" onMouseOver={handleVlaue}>
                            <MdOutlineEmail size={30} />
                        </button>
                        <button className='icon' data-lable="age" onMouseOver={handleVlaue}>
                            <BsCalendarDate size={30}  />
                        </button>
                        <button className='icon' data-lable="street" onMouseOver={handleVlaue}>  
                            <MdAddLocationAlt  size={30} />
                        </button>
                        <button className='icon' data-lable="phone" onMouseOver={handleVlaue}>
                            <MdAddCall size={30}  />
                        </button> 
                         <button className='icon' data-lable="password" onMouseOver={handleVlaue}> 
                            <MdLockOutline size={30}  />
                        </button>  

                    </div>
                    <button className='random-btn'
                    onClick={()=>refetch()}
                    >Random User</button>

                </div>

            </div>
        </>
    )
}

export default UsersComp