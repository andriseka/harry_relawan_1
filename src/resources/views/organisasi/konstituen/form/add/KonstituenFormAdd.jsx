import React, { useEffect, useState } from 'react'
import Layouts from '../../../../layouts/Layouts'
import { useDispatch } from 'react-redux'
import GridCols2 from '../../../../../components/grid/GridCols2';
import FormTitle from '../../../../../components/title/FormTitle';
import ButtonPrimary from '../../../../../components/button/ButtonPrimary';
import { getDptDetail } from '../../../../../../app/model/dpt/dptSlice';
import { useParams } from 'react-router-dom';
import { postKonstiten } from '../../../../../../app/model/konstituen/konstituenSlice';
import Loading from '../../../../../components/loading/Loading'
import { Camera, CameraResultType } from '@capacitor/camera';
import { useForm } from 'react-hook-form';

import { b64toBlob } from '../../../../../components/b64toblob/b64toblob'
import { imageResizer } from '../../../../../../utils/imageResizer';

const KonstituenFormAdd = () => {
    const dispatch = useDispatch();
    const profile = JSON.parse(localStorage.getItem('profile'));
    const [picture, setPicture] = useState('');
    const [upload, setUpload] = useState('');

    const {register, handleSubmit} = useForm();

    const [loading, setLoading] = useState(false);

    const { username,  dpt_kons_id } = useParams();

    const[detail, setDetail] = useState([]);


    const getDataDetailDpt = async() => {
        try {
            const response = await dispatch(getDptDetail(dpt_kons_id)).unwrap().catch((err) => {});
            setDetail(response.data);
        } catch (error) {
            
        }
    }

    const postDataKonstituen = async(data) => {
        try {
            const response = await dispatch(postKonstiten(data)).unwrap().catch((err) => {});
            if (response.status === 201) {
                setLoading(false);
                return window.location.href = `/${username}/organisasi/konstituen/data`;
            }
        } catch (error) {
            
        }
    }

    const takePicture = async () => {
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                resultType: CameraResultType.Base64
            });
            var imageUrl = image.base64String;
            setUpload(imageUrl);
            setPicture('data:image/png;base64,'+ imageUrl);


        } catch (error) {
            
        }
   }


    useEffect(() => {
        getDataDetailDpt();
    }, []);

    const handlePostKonstituen = async(data) => {
        setLoading(true);
        let blob = b64toBlob(upload, 'image/png');
        let file = new File([blob], 'photo.png', {
            type: blob.type,
            lastModified: new Date().getTime()
        })

        const resize = await imageResizer(file, 256, 256);

        data = {
            ...data,
            relawan_id :profile.id,
            dpt_id: dpt_kons_id,
            image : resize
        }

        return postDataKonstituen(data);
    }

    const handleBack = () => {
        return window.location.href = `/${username}/organisasi/konstituen/form`;
    }

    return (
        <Layouts>
            { loading ? <Loading /> : '' } 
            <div>
                <div className="flex justify-between items-center mb-5">
                    <div>
                        <FormTitle title={'TAMBAH DATA KONSTITUEN'} />
                    </div>
                    <div>
                        <span onClick={handleBack} className="text-orange-500 hover:text-orange-600 cursor-pointer">Kembali</span>
                    </div>
                </div>
                <GridCols2>
                    <div>
                        <div className="card">
                            <div className="card-body">
                                <div>
                                    <FormTitle title={'PERSONAL DATA DPT'} />
                                </div>
                                <div>
                                    <GridCols2>
                                        <div>
                                            <label>Nama Lengkap</label>
                                            <input type="text" className="form-control" placeholder={detail.name ? detail.name : ''} disabled />
                                        </div>
                                        <div>
                                            <label>Jenis Kelamin</label>
                                            <input type="text" className="form-control" 
                                                placeholder={
                                                    detail.gender === 'L' ? 'Laki Laki' :
                                                    detail.gender === 'P' ? 'Perempuan' :
                                                    ''
                                                } 
                                                disabled 
                                            />
                                        </div>
                                        <div>
                                            <label>Usia</label>
                                            <input type="text" className="form-control" placeholder={detail.usia ? `${detail.usia} Tahun` : ''} disabled />
                                        </div>
                                        <div>
                                            <label>Kecamatan</label>
                                            <input type="text" className="form-control" placeholder={detail.kecamatan ? detail.kecamatan : ''} disabled />
                                        </div>
                                        <div>
                                            <label>Desa</label>
                                            <input type="text" className="form-control" placeholder={detail.desa ? detail.desa : ''} disabled />
                                        </div>
                                        <div>
                                            <label>RT</label>
                                            <input type="text" className="form-control" placeholder={detail.rt ? detail.rt : ''} disabled />
                                        </div>
                                        <div>
                                            <label>RW</label>
                                            <input type="text" className="form-control" placeholder={detail.rw ? detail.rw : ''} disabled />
                                        </div>
                                        <div className="mb-3">
                                            <label>TPS</label>
                                            <input type="text" className="form-control" placeholder={detail.tps ? detail.tps : ''} disabled />
                                        </div>
                                    </GridCols2>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="card">
                            <div className="card-body">
                                <div>
                                    <FormTitle title={'Informasi Tambahan'} />
                                </div>
                                <form onSubmit={handleSubmit(handlePostKonstituen)}>
                                    <div className="mb-3">
                                        <label>Telephone</label>
                                        <input type="text" className="form-control" placeholder="Telephone" {...register('phone')}  />
                                    </div>
                                    <div className="mb-3">
                                        <label>Foto</label>
                                        <ButtonPrimary type={'button'} name={'Ambil Foto'} onClick={ takePicture } />
                                    </div>
                                    <div className="mb-5 flex justify-center">
                                        { picture ? <img src={ picture } alt="" className=" rounded-full h-64 w-64" /> : '' }
                                    </div>
                                    <div className="flex justify-end">
                                        <ButtonPrimary type={'submit'} name={'Simpan Data'} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </GridCols2>
            </div>
        </Layouts>
    )
}

export default KonstituenFormAdd
