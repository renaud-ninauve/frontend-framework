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

test('dispatch unknown command', () => {
    const handler = vi.fn();
    const dispatcher = new Dispatcher();
    const payload = {'hello': 'world'};  
    dispatcher.subscribe('command-test', handler);
    
    dispatcher.dispatch('command-unknown', payload);
});

test('dispatch several', () => {
    const [handler1, handler2] = [vi.fn(), vi.fn()];
    const dispatcher = new Dispatcher();
    const payload = {'hello': 'world'};  
    dispatcher.subscribe('command-test', handler1);
    dispatcher.subscribe('command-test', handler2);

    dispatcher.dispatch('command-test', payload);
    
    expect(handler1).toHaveBeenLastCalledWith(payload);
    expect(handler2).toHaveBeenLastCalledWith(payload);
});

test('unsubscribe', () => {
    const [handler1, handler2] = [vi.fn(), vi.fn()];
    const dispatcher = new Dispatcher();
    const payload = {'hello': 'world'};  
    const unsubscribe1 = dispatcher.subscribe('command-test', handler1);
    dispatcher.subscribe('command-test', handler2);
    unsubscribe1();

    dispatcher.dispatch('command-test', payload);
    
    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).toHaveBeenLastCalledWith(payload);
});


test('unsubscribe twice', () => {
    const [handler1, handler2] = [vi.fn(), vi.fn()];
    const dispatcher = new Dispatcher();
    const payload = {'hello': 'world'};  
    const unsubscribe1 = dispatcher.subscribe('command-test', handler1);
    dispatcher.subscribe('command-test', handler2);
    unsubscribe1();
    unsubscribe1();

    dispatcher.dispatch('command-test', payload);
    
    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).toHaveBeenLastCalledWith(payload);
});

test('subscribe twice', () => {
    const handler = vi.fn();
    const dispatcher = new Dispatcher();
    const payload = {'hello': 'world'};  
    dispatcher.subscribe('command-test', handler);
    
    dispatcher.dispatch('command-test', payload);
    
    expect(handler).toHaveBeenCalledOnce();
    expect(handler).toHaveBeenLastCalledWith(payload);
});

test('afther handlers', () => {
    const [handler, after1, after2] = [vi.fn(), vi.fn(), vi.fn()];
    const dispatcher = new Dispatcher();
    const payload = {'hello': 'world'};  
    dispatcher.subscribe('command-test', handler);
    dispatcher.afterEveryCommand(after1);
    dispatcher.afterEveryCommand(after2);

    dispatcher.dispatch('command-test', payload);
    
    expect(handler).toHaveBeenLastCalledWith(payload);
    expect(after1).toHaveBeenLastCalledWith(payload);
    expect(after2).toHaveBeenLastCalledWith(payload);
});