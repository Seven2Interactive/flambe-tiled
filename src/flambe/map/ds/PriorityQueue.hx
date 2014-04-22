package flambe.map.ds;

/*
 *                            _/                                                    _/
 *       _/_/_/      _/_/    _/  _/    _/    _/_/_/    _/_/    _/_/_/      _/_/_/  _/
 *      _/    _/  _/    _/  _/  _/    _/  _/    _/  _/    _/  _/    _/  _/    _/  _/
 *     _/    _/  _/    _/  _/  _/    _/  _/    _/  _/    _/  _/    _/  _/    _/  _/
 *    _/_/_/      _/_/    _/    _/_/_/    _/_/_/    _/_/    _/    _/    _/_/_/  _/
 *   _/                            _/        _/
 *  _/                        _/_/      _/_/
 *
 * POLYGONAL - A HAXE LIBRARY FOR GAME DEVELOPERS
 * Copyright (c) 2009 Michael Baczynski, http://www.polygonal.de
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
private typedef PriorityItem<T> = {
	public var value:T;
	public var priority:Int;
};

/**
 * A priority queue class (stores items in priority order)
 */
class PriorityQueue<T>
{

	public function new()
	{
		_items = new Array<PriorityItem<T>>();
	}

	/**
	 * Adds an item with a priority  O(log n)
	 */
	public function enqueue(item:T, priority:Int)
	{
		var obj = {
			value: item,
			priority: priority
		};

		if (_items.length == 0)
		{
			_items.push(obj);
		}
		else
		{
			_items.insert(search(priority), obj);
		}
	}

	/**
	 * Removes the lowest priority item  O(1)
	 */
	public function dequeue():T
	{
		var item =  _items.shift();
		return (item == null) ? null : item.value;
	}

	/**
	 * Check if an item exists in the queue  O(n)
	 */
	public function remove(value:T)
	{
		for (item in _items)
		{
			if (item.value == value)
			{
				_items.remove(item);
			}
		}
	}

	/**
	 * Removes all items from the queue
	 */
	public function clear()
	{
#if (cpp || php)
		_items.splice(0, _items.length);
#else
		untyped _items.length = 0;
#end
	}

	/**
	 * Converts values to a string format
	 */
	public function toString():String
	{
		var items = new Array<String>();
		for (item in _items)
		{
			items.push(Std.string(item.priority));
		}
		return "[" + items.join(", ") + "]";
	}

	public var length(get_length, never):Int;
	private function get_length():Int
	{
		return _items.length;
	}

	private inline function midpoint(min:Int, max:Int):Int
	{
		return min + Std.int((max - min) / 2);
	}

	/**
	 * Search for the index to insert a specific priority  O(log n)
	 */
	private function search(priority:Int):Int
	{
		var mid:Int, min:Int = 0, max:Int = _items.length - 1;
		while (max >= min)
		{
			mid = midpoint(min, max);
			if (_items[mid].priority < priority)
				min = mid + 1;
			else if (_items[mid].priority > priority)
				max = mid - 1;
			else
				return mid;
		}

		return min;
	}

	private var _items:Array<PriorityItem<T>>;

}