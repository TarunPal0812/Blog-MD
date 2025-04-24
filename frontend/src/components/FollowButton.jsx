


import React, { useState, useEffect } from "react";
import axios from "axios";

const FollowButton = ({ userId, currentUser, onFollowChange }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    // Check if following
    useEffect(() => {
        const checkFollowing = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/v1/follow/${userId}`,
                    { withCredentials: true }
                );
                setIsFollowing(res.data.isFollowing);
            } catch (err) {
                console.error("Error checking follow status:", err);
            } finally {
                setLoading(false);
            }
        };

        checkFollowing();
    }, [userId]);

    const handleFollow = async () => {
        try {
            setProcessing(true);
            await axios.post(
                `http://localhost:5000/api/v1/follow/${userId}`,
                {},
                { withCredentials: true }
            );
            setIsFollowing(true);
            onFollowChange?.(); // Trigger refresh
        } catch (err) {
            console.error("Error following:", err);
        } finally {
            setProcessing(false);
        }
    };

    const handleUnfollow = async () => {
        try {
            setProcessing(true);
            await axios.post(
                `http://localhost:5000/api/v1/follow/unfollow/${userId}`,
                {},
                { withCredentials: true }
            );
            setIsFollowing(false);
            onFollowChange?.(); // Trigger refresh
        } catch (err) {
            console.error("Error unfollowing:", err);
        } finally {
            setProcessing(false);
        }
    };

    if (loading) {
        return (
            <button className="ml-4 px-3 py-1 bg-gray-200 rounded-md text-sm" disabled>
                Loading...
            </button>
        );
    }

    return (
        <button
            onClick={isFollowing ? handleUnfollow : handleFollow}
            className="ml-4 px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
            disabled={processing}
        >
            {processing ? "Processing..." : isFollowing ? "Unfollow" : "Follow"}
        </button>
    );
};

export default FollowButton;
