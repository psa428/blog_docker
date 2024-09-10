import { Routes, Route } from 'react-router-dom';
import {  useDispatch } from 'react-redux';
 import { Header} from './components';
 import { Error } from './components';
 import { Post } from './pages/post/post';
 import { Autorization, Main, Users } from './pages';
 import { Registration } from './pages';
import styled from 'styled-components';
import { useLayoutEffect } from 'react';
import { setUser } from './actions';
import { Modal } from './components/modal/modal';


const AppColumn = styled.div`
  display:  flex;
  flex-direction: column;
  justify-content:  space-between;
  position: relative;
  width:  1000px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
  
`;

const Page = styled.div`
  
  padding:  120px 0 20px;
`;

const H2 = styled.h2`
  text-align:  center;
`;



const Footer = () => <div>Футер</div>;

const StyleHeader = styled(Header)`
  height: 120px;
`;

function App() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem('userData');

    if (!currentUserDataJSON) {
      return;
    };  

    const currentUserData = JSON.parse(currentUserDataJSON);

    dispatch(setUser({
      ...currentUserData,
      roleId: Number(currentUserData.roleId),
    
  }));

  }, [dispatch]);

  // useLayoutEffect(() => {
    
  //   fetch('/posts')
  //   .then(res => res.json())
  //   .then(console.log)
  // }, [])

  

  return (
    <AppColumn>
      
      <StyleHeader />
      <Page>
      
          <H2>Контент страницы</H2>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/login' element={<Autorization />} />
            <Route path='/register' element={<Registration />} />
            <Route path='/users' element={<Users />} />
            <Route path='/posts' element={<Post />} />
            <Route path='/posts/:id' element={<Post />} />
            <Route path='/posts/:id/edit' element={<Post />} />
            <Route path='*' element={<Error error={'PAGE_NOT_EXIST'} />} />


          </Routes>
      </Page>
      <Footer />
      <Modal />
    
    </AppColumn>
  );
}

export default App;
