// components/EditBusinessForm
import { useState, useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { thunkUpdateBusiness, thunkGetBusinesses } from '../../store/business';

const categories = ['bar', 'bubble tea', 'coffee', 'smoothies', 'tea'];

const EditBusinessForm = ({business, hideForm}) => {
    const dispatch = useDispatch();

    const [name, setName] = useState(business.name);
    const [description, setDescription] = useState(business.description);
    const [address, setAddress] = useState(business.address);
    const [zipcode, setZipcode] = useState(business.zipcode);
    const [category, setCategory] = useState(business.category);
    const [phone, setPhone] = useState(business.phone);
    const [websiteUrl, setWebsiteUrl] = useState(business.websiteUrl);

    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateZipcode = (e) => setZipcode(e.target.value);
    const updatePhone = (e) => setPhone(e.target.value);
    const updateCategory = (e) => setCategory(e.target.value);
    const updateWebsiteUrl = (e) => setWebsiteUrl(e.target.value);

    useEffect(() => {
        dispatch(thunkGetBusinesses())
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        const businessData = {
            ...business,
            name,
            description,
            address,
            zipcode,
            category,
            phone,
            websiteUrl
        };
        const updatedBusiness = await dispatch(thunkUpdateBusiness(businessData));

            if(updatedBusiness) {
                hideForm();
            }
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        hideForm();
      };

    return (
        <>
            <form className='create-business-form' onSubmit={handleSubmit} >
                <label>
                    Name of your business
                    <input type='text' name='name' value={name} onChange={updateName}/>
                </label>
                <label>
                    Description
                    <input type='text' name='description' value={description} onChange={updateDescription}/>
                </label>
                <label>
                    Address
                    <input type='text' name='address' value={address} onChange={updateAddress}/>
                </label>
                <div> New York, NY </div>
                <label>
                    Zipcode
                    <input type='text' name='zipcode' value={zipcode} onChange={updateZipcode}/>
                </label>
                <label>
                    Category
                    <select value={category} onChange={updateCategory}>
                        {categories.map(type =>
                            <option key={type}>{type}</option>
                        )}
                    </select>
                </label>
                <label>
                    Phone Number
                    <input type='text' name='phone' value={phone} onChange={updatePhone}/>
                </label>
                <label>
                    Website Url
                    <input type='text' name='websiteUrl' value={websiteUrl} onChange={updateWebsiteUrl}/>
                </label>
                <button type="submit">Update your business</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </>
    )
}

export default EditBusinessForm;
