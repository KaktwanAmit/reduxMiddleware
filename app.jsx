import {applyMiddleware,createStore} from 'redux';

const reducer =function(initialState=0,action){
	if(action.type==="INC"){
		return initialState+1;
	}else if(action.type==="DEC"){
		return initialState-1;
	}else if(action.type==="E"){
		throw new Error('new errrr');
	}
	return initialState;
}

const loggor=(store)=>(next)=>(action)=>{
	console.log("action fired",action);
	next(action);
};

const err=(store)=>(next)=>(action)=>{
	try{
		next(action);
	}catch(e){
		console.log('errrrrrrrr',e);
	}
};
const middleware=applyMiddleware(loggor,err);

const store=createStore(reducer,1,middleware);

store.subscribe(()=>{
	console.log("store changed",store.getState());
})
store.dispatch({type:"INC"});
store.dispatch({type:"DEC"});
store.dispatch({type:"E"});