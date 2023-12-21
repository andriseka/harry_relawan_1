import React, { useEffect, useState } from 'react'
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType } from '@capacitor/camera';
import { useDispatch } from 'react-redux';
import { getPosko, postPosko } from '../../model/posko/poskoSlice';
import toast from 'react-hot-toast';
import PoskoForm from '../../../resources/views/posko/form/PoskoForm';
import PoskoData from '../../../resources/views/posko/data/PoskoData';

import { b64toBlob } from '../../../resources/components/b64toblob/b64toblob'
import { imageResizer } from '../../../utils/imageResizer'
import { useParams } from 'react-router-dom';

function PoskoController({ view }) {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const { username } = useParams();

     // take picture
     const [picture, setPicture] = useState('');
     const [upload, setUpload] = useState('');
     const [location, setLocation] = useState({
         lat: '',
         long: ''
     })
    const takePicture = async () => {
         try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                resultType: CameraResultType.Base64
            });
            var imageUrl = image.base64String;
            setUpload(imageUrl)
            setPicture('data:image/png;base64,' + imageUrl);
         } catch (error) {
             
         }
    }

    const printCurrentPosition = async () => {
        try {
             const coordinates = await Geolocation.getCurrentPosition();
             setLocation({ lat: coordinates.coords.latitude, long: coordinates.coords.longitude })
        } catch (error) {
             setLocation({lat: '', long: ''})
             alert('Silahkan aktifkan GPS Anda dan reload halaman')
        }
    };

    // get data
    const [posko, setPosko] = useState([]);
    const getDataPosko = async() => {
        try {
            const response = await dispatch(getPosko()).unwrap().catch((err) => {});
            setPosko(response.data.map((i) => ({
                name: i.name, 
                lat: JSON.parse(i.lat), 
                lon: JSON.parse(i.long),
                image: i.image,
                title: i.title,
                desc: i.desc
            })));
        } catch (error) {
            
        }
    }

    useEffect(() => {
        printCurrentPosition();
        getDataPosko();
    }, []);

    const onSubmit = async(data) => {
        setLoading(true);

        let blob = b64toBlob(upload, "image/png");
        let file = new File([blob], 'photo.png', {
            type: blob.type,
            lastModified: new Date().getTime()
        })

        const resize = await imageResizer(file, 256, 256);

        data = {
            ...data,
            image: resize,
            lat: location.lat,
            long : location.long,
        }

        try {
            const response = await dispatch(postPosko(data)).unwrap().catch((err) => {});
            if (response) {
                setLoading(false);
                if (response.status === 201) {
                    toast.success('Data berhasil ditambahkan');
                    setTimeout(() => {
                        window.location.href = `/${username}/posko/data`; 
                    }, 1000);
                }
            }
        } catch (error) {
            
        }
       
    }

    if (view === 'form') {
        return (
            <PoskoForm 
                onSubmit={onSubmit}
                picture={picture}
                takePicture={takePicture}
                lat={location.lat}
                long={location.long}
                loading={loading}
            />
        )
    } else if (view === 'data') {
        return (
            <PoskoData 
                posko={posko}
            />
        )
    }
}

export default PoskoController
