import React from "react";
import axios from "./axios";
// import { useState, useEffect } from "react";
import { FriendButton } from "./friendbutton";
import { render, waitForElement } from "@testing-library/react";

jest.mock("./axios");

test("Show add friend button when users are not friends", async () => {
    axios.get.mockResolvedValue({
        data: {
            button: "Send friend request"
        }
    });

    const { container } = render(<FriendButton />);

    const elem = await waitForElement(() => container.querySelector("button"));

    expect(elem.innerHTML).toBe("Send friend request");
});

test("Show add friend button when users are not friends", async () => {
    axios.get.mockResolvedValue({
        data: {
            button: "Send friend request"
        }
    });

    const { container } = render(<FriendButton />);

    const elem = await waitForElement(() => container.querySelector("button"));

    expect(elem.innerHTML).toBe("Send friend request");
});
