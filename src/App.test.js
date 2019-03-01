import AttendeaseAPI from  './api/AttendeaseAPI'
import App from './App'
import CenteredTabs from './components/CenteredTabs';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Enzyme, { render, shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import React from 'react'

Enzyme.configure({ adapter: new enzymeAdapterReact16() });
chai.use(chaiEnzyme());
global.jestExpect = global.expect;
global.expect = chai.expect;

describe('App component', () => {
  it('shallow renders without crashing', () => {
    shallow(<App />);
  });

  describe('<CenteredTabs />', () => {
    it('renders 3 <Tab /> components', () => {
      const wrapper = render(<CenteredTabs onChangeCallback={() => {}}/>);
      expect(wrapper.find('.centeredTab')).to.have.lengthOf(3);
  });
});

});

describe('these tests are not valid for production', async () => {
  it('should fetch Sponsors', async () => {
    const api = new AttendeaseAPI();
    const sponsors = await api.getAttendeaseEventSponsors();
    global.jestExpect(sponsors.length).toEqual(5);
  });

  it('should fetch Event', async () => {
    const api = new AttendeaseAPI();
    const event = await api.getAttendeaseEvent();
    global.jestExpect(event.name).toEqual('Digital Business Conference ');
  });

  it('should fetch Speakers', async () => {
    const api = new AttendeaseAPI();
    const speakers = await api.getAttendeaseEventSpeakers();
    global.jestExpect(speakers.length).toEqual(3);
  });

  it('should fetch Sessions', async () => {
    const api = new AttendeaseAPI();
    const sessions = await api.getAttendeaseEventSessions();
    global.jestExpect(sessions.length).toEqual(8);
  });
});
