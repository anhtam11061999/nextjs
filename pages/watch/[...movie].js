import { useRouter } from 'next/router'
import axios from 'axios'
import { Row, Col, Image } from 'antd'
import *as api from '../../redux/api/movies'

export default function DetailMovie({ movie }) {
    const router = useRouter()
    const { id } = router.query
    console.log(movie)
    return (
        <>
            <Row>
                <Col span={6} style={{ padding: '10px' }}>
                    <Image src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt={movie.title} />
                    <p style={{ textAlign: 'center' }}>{movie.original_title}</p>
                </Col>
                <Col span={12} style={{ padding: '10px' }}>
                    <h1>{movie.title}</h1>
                    <p>{movie.overview}</p>
                    <p>đã sửa</p>
                </Col>
                <Col span={6} style={{ padding: '10px' }}>
                    <Row>
                        {movie.images.backdrops.map((item, index) => (
                            <Col span={24} key={index} style={{ padding: '10px' }}>
                                <Image
                                    src={`https://image.tmdb.org/t/p/w300/${item.file_path}`}
                                    alt={movie.vote_count}

                                />
                            </Col>
                        ))}
                        

                    </Row>
                </Col>
            </Row>
        </>
    )
}


export async function getServerSideProps({ query }) {
    console.log(query)
    //   const id = await query.id;
    //   const result = await getDataMoviesById(id)
    const params = query.movie || [];
    const id = params[1];
    const result = await api.getDataMoviesById(id);
    return {
        props: {
            movie: result,
        },
    }
}