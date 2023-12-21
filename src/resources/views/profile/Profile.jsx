import React, { useState } from 'react'
import Layouts from '../layouts/Layouts'
import { useForm } from 'react-hook-form'
import ButtonSuccess from '../../components/button/ButtonSuccess';
import FormTitle from '../../components/title/FormTitle';
import GridCols2 from '../../components/grid/GridCols2';
import Loading from '../../components/loading/Loading';
import Kordes from '../organisasi/relawan/organisasi/Kordes';
import Korwe from '../organisasi/relawan/organisasi/Korwe';
import KonstituenByRelawan from '../organisasi/relawan/organisasi/KonstituenByRelawan';
import { Toaster } from 'react-hot-toast';

const Profile = ({
    profile, onUpdate, loading, takePicture, picture
}) => {
    const {register, handleSubmit} = useForm();

    return (
        <Layouts>
            { loading ? <Loading /> : '' }
            <Toaster position="top-right" />
            <div>
                <div className="flex justify-between items-center mb-5">
                    <div>
                        <span className="text-2xl font-bold text-gray-600">{ profile.name ? profile.name : '' }</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="flex justify-center mb-3">
                                <div className="mb-3">
                                    <img src={ picture.length > 0 ? picture : profile.photo } alt="" className="mb-3 w-64 h-64 rounded-full" />
                                    <div className="flex justify-end mb-3">
                                        <span onClick={takePicture} className="cursor-pointer px-3 py-1 bg-orange-500 rounded-full text-white text-xs">Update Foto</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-lg font-bold text-gray-600"> { profile.name ? profile.name : '' } </span> <br />
                                        <span className="text-base text-gray-600"> 
                                            { 
                                                profile.jabatan === 'korcam' ? 'Koordinator Kecamatan' :  
                                                profile.jabatan === 'kordes' ? 'Koordinator Desa' :  
                                                profile.jabatan === 'korwe' ? 'Koordinator RW' :  
                                                profile.jabatan === 'anggota' ? 'Anggota' :  ''
                                            }
                                        </span>   &nbsp;
                                        <span className="text-base text-gray-600">
                                            ( Relawan )
                                        </span>
                                        <br /> <br />
                                        <a href={`https://wa.me/${profile.phone ? profile.phone : ''}`} target="_blank" className="bg-green-500 hover:bg-green-600 text-white hover:text-white rounded-full px-3 py-2">
                                            { profile.phone ? profile.phone : '' }
                                        </a>
                                        <div className="mt-5 mb-3">
                                            { `${profile.desa}, RT 0${profile.rt} / 0${profile.rw}, ${profile.kecamatan}` }
                                        </div>
                                        <div>
                                            <span>Target Konstituen : { profile.target ? profile.target : '' }</span>
                                        </div>
                                        <div className="mb-3">
                                            <span>Total Konstituen : { profile.total ? profile.total : '' }</span>
                                        </div>
                                        <div>
                                            <a href={ profile.docs ? profile.docs : '' } className="text-blue-500 hover:text-blue-600" target="_blank">Lihat Dokumen</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onUpdate)}>
                                <div>
                                    <FormTitle title={'PERSONAL DATA'} />
                                </div>
                                <div className="mb-3">
                                    <GridCols2>
                                        <div>
                                            <label>Nama Lengkap</label>
                                            <input type="text" className="form-control" defaultValue={profile.name ? `${profile.name} ( ${profile.usia} Tahun )` : ''} disabled />
                                        </div>
                                        <div>
                                            <label>Jenis Kelamin</label>
                                            <input type="text" className="form-control" 
                                                defaultValue={
                                                    profile.gender === 'L' ? 'Laki Laki' :
                                                    profile.gender === 'P' ? 'Perempuan' : ''
                                                } 
                                                disabled 
                                            />
                                        </div>
                                        <div>
                                            <label>Posisi</label>
                                            <input type="text" className="form-control" 
                                                defaultValue={'Relawan'} 
                                                disabled 
                                            />
                                        </div>
                                        <div>
                                            <label>Jabatan</label>
                                            <input type="text" className="form-control" 
                                                defaultValue={
                                                    profile.jabatan === 'korcam' ? 'Koordinator Kecamatan' :  
                                                    profile.jabatan === 'kordes' ? 'Koordinator Desa' :  
                                                    profile.jabatan === 'korwe' ? 'Koordinator RW' :  
                                                    profile.jabatan === 'anggota' ? 'Anggota' :  ''
                                                } 
                                                disabled 
                                            />
                                        </div>
                                        <div>
                                            <label>Alamat</label>
                                            <input type="text" className="form-control" 
                                                defaultValue={
                                                    profile.name ?
                                                    `${profile.desa}, RT 0${profile.rt} / 0${profile.rw}, ${profile.kecamatan}`
                                                    : ''
                                                } 
                                                disabled 
                                            />
                                        </div>
                                        <div>
                                            <label>Nomor Handphone</label>
                                            <input type="text" className="form-control" defaultValue={profile.phone ? profile.phone : ''} disabled />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label>Update Dokumen</label>
                                            <input type="file" className="form-control px-3 py-1" accept="image/png,imgae/jpg,image/jpeg"  {...register('docs')} />
                                        </div>
                                        <div>
                                            <label>Username</label>
                                            <input type="text" className="form-control" placeholder="Tulis Username" {...register('username_update')} defaultValue={profile.username ? profile.username : ''} required />
                                        </div>
                                        <div>
                                            <label>Password</label>
                                            <input type="text" className="form-control" placeholder="********" {...register('password')}  />
                                        </div>
                                    </GridCols2>
                                </div>
                                <div className="flex justify-end">
                                    <ButtonSuccess name={'Update Data'} />
                                </div>     
                            </form>                               
                        </div>
                    </div>
                </div>

                {
                    profile.jabatan === 'korcam' ? 
                    <div>
                        <Kordes /> 
                        <Korwe />
                    </div> : 
                    profile.jabatan === 'kordes' ? 
                    <div>
                        <Korwe />
                    </div> : ''
                }

                {/* konstituen */}
                <div>
                    <KonstituenByRelawan relawan={profile.username} relawan_username={profile.username} />
                </div>
            </div>
        </Layouts>
    )
}

export default Profile
