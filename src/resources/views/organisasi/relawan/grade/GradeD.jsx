import React, { useEffect, useState } from 'react'
import Relawan from '../Relawan'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getByGradeRelawan, getRelawanGradeByCode, getRelawanGradeByCodeRw } from '../../../../../app/model/relawan/relawanSlice';
import toast from 'react-hot-toast';
import FormTitle from '../../../../components/title/FormTitle';

const GradeD = () => {
    const dispatch = useDispatch();
    const {username} = useParams();
    const profile = JSON.parse(localStorage.getItem('profile'));
    const [relawan, setRelawan] = useState([]);
    const [pagination, setPagination] = useState([]);

    const getDataByCode = async(data) => {
        try {
            const response = await dispatch(getRelawanGradeByCode(data)).unwrap().catch((err) => {});
            setRelawan(response.data);
            setPagination(response.pagination);
        } catch (error) {
            
        }
    }

    const getDataByCodeRw = async(data) => {
        try {
            const response = await dispatch(getRelawanGradeByCodeRw(data)).unwrap().catch((err) => {});
            setRelawan(response.data);
            setPagination(response.pagination);
        } catch (error) {
            
        }
    }

    // get data relawan
    const getData = async(page) => {
        const profileCode = profile.code;
        const explode = profileCode.split('.');
        if (profile.jabatan === 'korcam') {
            const data = {
                code: explode[0],
                grade: 'd',
                page: page
            }
            return getDataByCode(data)
        } else if(profile.jabatan === 'kordes') {
            const data = {
                code: explode[0] + '.' + explode[1],
                grade: 'd',
                page: page
            }
            return getDataByCode(data)
        } else {
            const data = {
                code: explode[0] + '.' + explode[1] + '.' + profile.rw,
                grade: 'd',
                page: page
            }
            return getDataByCodeRw(data);
        }
    }

    useEffect(() => {
        getData(1)
    }, []);

     // pagination
     const handlePagination = (page) => {
        if (page === 0) {
            toast('Anda berada di halaman pertama', {icon: '🙏'});
        } else if (page === pagination.last_page + 1) {
            toast('Anda berada di halaman terkahir', {icon: '🙏'});
        } else {
            return getData(page);
        }
    }
    
    return (
        <Relawan>
            <div>
                <div className="card">
                    <div className="card-body">
                        <div>
                            <FormTitle title={'DATA RELAWAN GRADE D'} />
                        </div>

                        <div>
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-5">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-gray-600 uppercase th-color">
                                        <tr>
                                            <th scope="col" className="px-4 py-3" style={{width:"5%"}}>
                                                No
                                            </th>
                                            <th scope="col" className="px-4 py-3">
                                                Nama
                                            </th>
                                            <th scope="col" className="px-4 py-3">
                                                Kecamatan
                                            </th>
                                            <th scope="col" className="px-4 py-3">
                                                Desa
                                            </th>
                                            <th scope="col" className="px-4 py-3">
                                                Tps
                                            </th>
                                            <th scope="col" className="px-4 py-3">
                                                Jabatan
                                            </th>
                                            <th scope="col" className="px-4 py-3 text-center">
                                                Target                                            
                                            </th>
                                            <th scope="col" className="px-4 py-3 text-center">
                                                Total
                                            </th>
                                            <th scope="col" className="px-4 py-3 text-center">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            relawan.map((data) => {
                                                return (
                                                    <tr key={data.no} className="bg-white border-b dark:border-gray-700 text-gray-600">
                                                        <td className="px-4 py-3">
                                                            { data.no }
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            { data.name }
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            { data.kecamatan }
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            { data.desa }
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            { data.tps }
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            {
                                                                data.jabatan === 'korcam' ? 'Korcam' :
                                                                data.jabatan === 'kordes' ? 'Kordes' :
                                                                data.jabatan === 'korwe' ? 'Korwe' :
                                                                data.jabatan === 'anggota' ? 'Anggota' : ''
                                                            }
                                                        </td>
                                                        <td className="px-4 py-3 text-center">
                                                            { data.target }
                                                        </td>
                                                        <td className="px-4 py-3 text-center">
                                                            { data.total }
                                                        </td>
                                                        <td className="px-4 py-3 text-center">
                                                            {
                                                                profile.jabatan === 'korcam' ? 
                                                                <Link to={`/${username}/organisasi/relawan/move/${data.username}`} className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white hover:text-white rounded-full">
                                                                    Pindah
                                                                </Link> : 
                                                                <span className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white hover:text-white rounded-full">
                                                                    No Access
                                                                </span>
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex justify-center mb-3">
                                {
                                    pagination.pagination === true ? 
                                    <div>
                                        <a className="me-3" onClick={() => handlePagination(pagination.current_page - 1)}>Sebelumnya</a>
                                        <a onClick={() => handlePagination(pagination.current_page + 1)}>Selanjutnya</a>
                                    </div> : ''
                                }
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <span>Halaman { pagination.current_page ? pagination.current_page : '' }</span>
                                </div>
                                <div>
                                    <span>Total : { pagination.total ? pagination.total : '' } Tps</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Relawan>
    )
}

export default GradeD
