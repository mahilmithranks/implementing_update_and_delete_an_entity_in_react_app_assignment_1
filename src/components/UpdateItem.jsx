import React, { useState, useEffect } from 'react';

const UpdateItem = ({ itemId, apiUri }) => {
    // Initialize state for the item and input value
    const [item, setItem] = useState(null);
    const [updatedValue, setUpdatedValue] = useState('');
    const [error, setError] = useState(null);

    // Fetch the existing item when the component mounts
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`${apiUri}/${itemId}`);
                if (!response.ok) throw new Error('Failed to fetch item');
                const data = await response.json();
                setItem(data);
                setUpdatedValue(data.name); // Assuming the item has a 'name' property
            } catch (err) {
                setError(err.message);
            }
        };
        fetchItem();
    }, [apiUri, itemId]);

    // Handle input changes
    const handleInputChange = (e) => {
        setUpdatedValue(e.target.value);
    };

    // Handle form submission to update the item
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUri}/${itemId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: updatedValue }), // Assuming the item has a 'name' property
            });
            if (!response.ok) throw new Error('Failed to update item');
            const updatedItem = await response.json();
            setItem(updatedItem);
            alert('Item updated successfully!');
        } catch (err) {
            setError(err.message);
        }
    };

    if (error) return <div>Error: {error}</div>;
    if (!item) return <div>Loading...</div>;

    return (
        <form onSubmit={handleFormSubmit}>
            <label>
                Update Item:
                <input
                    type="text"
                    value={updatedValue}
                    onChange={handleInputChange}
                />
            </label>
            <button type="submit">Update</button>
        </form>
    );
};

export default UpdateItem;

