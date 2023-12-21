import React, { useState } from 'react'
import Profile from '../../../resources/views/profile/Profile'
import { imageResizer } from '../../../utils/imageResizer';
import { getDetailRelawan, updateDataRelawan } from '../../model/relawan/relawanSlice';
import { useDispatch } from 'react-redux';
import { Camera, CameraResultType } from '@capacitor/camera';

import { b64toBlob } from '../../../resources/components/b64toblob/b64toblob';
import toast from 'react-hot-toast';

function ProfileController() {
    const dispatch = useDispatch();

    const profile = JSON.parse(localStorage.getItem('profile'));
    const [loading, setLoading] = useState(false);

    const onUpdate = async(data) => {
        setLoading(true);
        if (data.docs.length > 0) {
            data.docs = await imageResizer(data.docs[0], 780, 400).catch((err) => {});
        } else {
            data.docs = ''
        }

        if (data.username_update === '') {
            data.username_update = profile.username
        } else {
            data.username_update = data.username_update;
        }

        data = {
            ...data,
            username: profile.username,
            username_update: data.username_update
        }

        try {
            const response = await dispatch(updateDataRelawan(data)).unwrap().catch((err) => {});
            if (response) {
                setLoading(false);
                if (response.status === 200) {
                    const relawanUpdate = await dispatch(getDetailRelawan(data.username_update)).unwrap().catch((err) => {});
                    localStorage.setItem('profile', JSON.stringify(relawanUpdate.data));
                    return window.location.href = `/${data.username_update}/profile`
                }
            }
        } catch (error) {
            
        }
    }

    const [picture, setPicture] = useState([]);
    const takePicture = async() => {
        try {
            const image = await Camera.getPhoto({
                quality: 30,
                allowEditing: true,
                resultType: CameraResultType.Base64
            });
            let imageUrl = image.base64String;

            // temp
            setPicture('data:image/png;base64,'+ imageUrl);

            let upload = b64toBlob(imageUrl, 'image/png');
            const file = new File([upload], 'photo.png', {
                type: upload.type,
                lastModified: new Date().getTime()
            });

            const resize = await imageResizer(file, 256, 256);   
             
            const data = {
                photo: resize,
                username: profile.username,
                username_update: profile.username
            }
            const response = await dispatch(updateDataRelawan(data)).unwrap().catch((err) => {});
            if (response.status === 200) {
                toast.success('Foto berhasil diperbaharui');
                localStorage.setItem('profile', JSON.stringify(response.data));
                setTimeout(() => {
                   window.location.reload(); 
                }, 1000);
            }

        } catch (error) {
            
        }
    }

    return (
        <Profile 
            profile={profile}
            loading={loading}
            onUpdate={onUpdate}
            picture={picture}
            takePicture={takePicture}
        />
    )
}

export default ProfileController
