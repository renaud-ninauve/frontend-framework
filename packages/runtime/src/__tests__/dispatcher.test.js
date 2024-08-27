import {Dispatcher} from '../index'
import {beforeEach, expect, test, vi} from 'vitest'

test('dispatch', () => {
    const handler = vi.fn();
    const dispatcher = new Dispatcher();
    const payload = {'hello': 'world'};  
    dispatcher.subscribe('command-test', handler);
    
    dispatcher.dispatch('command-test', payload);
    
    expect(handler).toHaveBeenLastCalledWith(payload);
});